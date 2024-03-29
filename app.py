from datetime import datetime, timedelta, timezone
import hashlib
import secrets
import re
import os
from dotenv import load_dotenv
import jwt
import json
import io
import pdfcrowd
from bson import ObjectId
from flask import Flask, jsonify, request, make_response, render_template
from flask_restful import Resource, Api
from flask_cors import CORS
from pymongo import MongoClient
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from werkzeug.utils import secure_filename
from tempfile import NamedTemporaryFile

app = Flask(__name__)
api = Api(app)
CORS(app, resources={
    r"/api/*": {
        "origins": "https://kkp.dimsomnia.cloud",
        "supports_credentials": True,
        "methods": ["GET", "POST", "PUT", "DELETE"]
    }
})

MONGO_URL = os.getenv('MONGO_URL')
client = MongoClient(MONGO_URL)
db = client['kkp']
SECRET_KEY = 'LUWAKWHITECOFFEE'
ALGO = 'HS256'

# Set up the Drive API client
USER_TOKEN = 'usertoken'
ADMIN_TOKEN = 'admintoken'

FOLDER_KELAHIRAN = os.getenv('FOLDER_KELAHIRAN')
FOLDER_KEMATIAN = os.getenv('FOLDER_KEMATIAN')
FOLDER_DOMISILI = os.getenv('FOLDER_DOMISILI')
FOLDER_SKTM = os.getenv('FOLDER_SKTM')
FOLDER_PENGADUAN = os.getenv('FOLDER_PENGADUAN')
FOLDER_PROFILE_PICTURE = os.getenv('FOLDER_PROFILE_PICTURE')

FOLDER_SURAT_KELAHIRAN = os.getenv('FOLDER_SURAT_KELAHIRAN')
FOLDER_SURAT_KEMATIAN = os.getenv('FOLDER_SURAT_KEMATIAN')
FOLDER_SURAT_DOMISILI = os.getenv('FOLDER_SURAT_DOMISILI')
FOLDER_SURAT_SKTM = os.getenv('FOLDER_SURAT_SKTM')


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,USER_ID'
    # Menambahkan semua metode HTTP yang diizinkan
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH'
    return response


class GoogleDriveAPI:
    def __init__(self):
        self.SCOPES = ['https://www.googleapis.com/auth/drive']
        self.SERVICE_ACCOUNT_FILE = './kkp.json'
        self.credentials = self.get_credentials()
        self.service = build('drive', 'v3', credentials=self.credentials)

    def get_credentials(self):
        credentials = service_account.Credentials.from_service_account_file(
            self.SERVICE_ACCOUNT_FILE, scopes=self.SCOPES)
        return credentials

    def upload_pdf(self, folder_id, file, custom_filename):
        # Simpan file sementara untuk mengunggah
        with NamedTemporaryFile(delete=False) as tmp_file:
            # Simpan file yang diunggah ke file sementara
            tmp_file.write(file.read())
            # Buat objek MediaFileUpload dengan path file sementara
            media = MediaFileUpload(tmp_file.name)
            # Buat metadata file dengan nama file yang disesuaikan
            file_metadata = {'name': custom_filename, 'parents': [folder_id]}
            # Unggah file
            file = self.service.files().create(
                body=file_metadata, media_body=media, fields='id').execute()
            # Dapatkan ID file yang diunggah
            file_id = file.get("id")
            print(f'File ID: {file_id}')
            # Buat URL untuk file yang diunggah
            file_url = f"https://drive.google.com/file/d/{
                file_id}/view?usp=sharing"
            return file_url

    # kode program untuk otp mail dan menggunakan flask mail

    def updateProfilePic(self, folder_id, file_pic, file_recent_url, custom_filename):
        # Extract the file ID from the existing profile picture URL using regular expression matching
        if file_recent_url:
            match = re.search(r'/d/([-\w]+)/', file_recent_url)
            if match:
                file_id = match.group(1)
                # Delete the old profile picture file
                file = self.service.files().get(fileId=file_id, fields='id, parents').execute()
                print(f'File with ID {file_id} has been deleted.')

                if folder_id in file.get('parents', []):
                    # Delete the file
                    self.service.files().delete(fileId=file_id).execute()
                    print(f'File with ID {
                        file_id} has been deleted from folder with ID {folder_id}.')
                else:
                    print(f'File with ID {
                        file_id} is not in folder with ID {folder_id}.')

            # Upload the new profile picture file
        with NamedTemporaryFile(delete=False) as tmp_file:
            # Save the uploaded file to a temporary file
            tmp_file.write(file_pic.read())
            # Create a MediaFileUpload object with the path of the temporary file
            media = MediaFileUpload(
                tmp_file.name, mimetype=file_pic.content_type)
            # Create file metadata with the customized file name and parent folder ID
            file_metadata = {'name': custom_filename, 'parents': [folder_id]}
            # Upload the file
            file = self.service.files().create(
                body=file_metadata, media_body=media, fields='id').execute()
            # Get the uploaded file ID
            file_id = file.get("id")
            print(f'New File ID: {file_id}')

            # Create URL for the uploaded file
            file_url = f"https://drive.google.com/file/d/{
                file_id}/view?usp=sharing"

        return file_url

    def delete_file(self, folder_id, file_url):
        # Extract file ID from URL
        match = re.search(r'/d/([-\w]+)', file_url)
        if match:
            file_id = match.group(1)

            # Get the file from Google Drive
            file = self.service.files().get(fileId=file_id, fields='id, parents').execute()

            # Check if the file is in the specified folder
            if folder_id in file.get('parents', []):
                # Delete the file
                self.service.files().delete(fileId=file_id).execute()
                print(f'File with ID {
                      file_id} has been deleted from folder with ID {folder_id}.')
            else:
                print(f'File with ID {
                      file_id} is not in folder with ID {folder_id}.')
        else:
            print(f"Couldn't extract file ID from URL: {file_url}")


class PdfCrowd:
    def uploadValidateSurat(self, item, jenis):
        if jenis == 'kelahiran':
            html = render_template('surat_kelahiran.html', data=item)
        elif jenis == 'kematian':
            html = render_template('surat_kematian.html', data=item)
        elif jenis == 'domisili':
            html = render_template('surat_domisili.html', data=item)
        else:
            html = render_template('surat_sktm.html', data=item)

        # koneksi api pdfcrowd
        client = pdfcrowd.HtmlToPdfClient(
            'NisrinaZ', 'b0eae1da21e5169852e474411a6c5093')
        client.setNoMargins(True)
        # Convert HTML to PDF and write the result to a byte stream
        pdf_stream = io.BytesIO()
        client.convertStringToStream(html, pdf_stream)
        pdf_stream.seek(0)  # Move to the beginning of the stream

        return pdf_stream


class UpdatePhotoProfile:
    def updatePhoto(self, pic, recent_filepath):
        # generate random string
        random_str = ''.join(secrets.choice(
            'abcdefghijklmnopqrstuvwxyz1234567890') for i in range(5))
        # delete old image file
        if recent_filepath:
            if os.path.isfile("../frontend/public" + recent_filepath):
                os.remove("../frontend/public" + recent_filepath)
        # change name
        filename = secure_filename(pic.filename)
        extension = filename.split(".")[-1]
        new_filename_db = "/profile/"f'pic-{
            random_str}.{extension}'
        new_filename_local = "../frontend/public/profile/"f'pic-{
            random_str}.{extension}'
        # Menetapkan nama file baru ke properti filename
        pic.save(new_filename_local)

        return new_filename_db


class UserHomepage(Resource):
    def get(self):
        usertoken = request.headers.get('Authorization')
        token = usertoken.split('Bearer ')[1]
        if token:
            try:
                payload = jwt.decode(
                    token,
                    SECRET_KEY,
                    ALGO
                )
                userinfo = db.users.find_one({'email': payload['email']})
                if userinfo:
                    del userinfo['password']
                    userinfo['_id'] = str(userinfo['_id'])
                    return make_response(jsonify({'loggedIn': True, 'data': userinfo}), 200)

                return make_response(jsonify({'message': 'Invalid token'}), 401)
            except jwt.PyJWTError as e:
                return make_response(jsonify({'message': str(e)}), 401)
        return jsonify({'loggedIn': False})


class UserRegister(Resource):
    def post(self):
        data = request.form.get('data')
        json_data = json.loads(data)
        nama = json_data['nama']
        nik = json_data['nik']
        alamat = json_data['alamat']
        email = json_data['email']
        password = json_data['password']
        pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        existing_user = db.users.find_one({"email": email})
        existing_nik = db.users.find_one({"nik": nik})

        if existing_nik:
            return make_response(jsonify({'message': 'NIK sudah terdaftar.'}), 400)
        if existing_user:
            # Return a JSON-serializable dictionary
            return make_response(jsonify({'message': 'Email sudah digunakan!'}), 400)

        db.users.insert_one({
            "profile_picture": None,
            "nama_lengkap": nama,
            "nik": nik,
            "alamat": alamat,
            "email": email,
            "password": pw_hash,
            "created_At": datetime.now(timezone.utc),
            "updated_At": datetime.now(timezone.utc)
        })

        # Return a JSON-serializable dictionary
        return {"result": "success"}


class UserLogin(Resource):
    def post(self):
        data = request.form.get('data')
        json_data = json.loads(data)
        email = json_data["email"]
        password = json_data["password"]
        pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        user = db.users.find_one({"email": email, "password": pw_hash})

        if user:
            payload = {
                'email': email,
                'exp': datetime.now(timezone.utc) + timedelta(seconds=60 * 60 * 24)
            }
            del user['password']
            user['_id'] = str(user['_id'])
            token = jwt.encode(payload, SECRET_KEY, ALGO)
            print('token')
            return make_response(jsonify({"result": "success", "token": token, "user": user}), 200)
        return make_response(jsonify({"message": "Email atau password salah"}), 401)

    def get(self):
        usertoken = request.headers.get('Authorization')
        token = usertoken.split('Bearer ')[1]
        payload = jwt.decode(
            token, SECRET_KEY, ALGO
        )
        userinfo = db.users.find_one({"email": payload["email"]})
        if userinfo:
            del userinfo['password']
            userinfo['_id'] = str(userinfo['_id'])
            return make_response(jsonify({"message": "User terautentikasi", "user": userinfo}), 200)
        return make_response(jsonify({"message": "Token tidak valid"}), 401)


class UserProfile(Resource):
    # def get(self):
    #     usertoken = request.headers.get('Authorization')
    #     token = usertoken.split('Bearer ')[1]
    #     try:
    #         payload = jwt.decode(
    #             token,
    #             SECRET_KEY,
    #             ALGO
    #         )
    #         userinfo = db.users.find_one({
    #             "email": payload["email"]
    #         })
    #         if userinfo:
    #             del userinfo["password"]
    #             userinfo['_id'] = str(userinfo['_id'])
    #             return make_response(jsonify(userinfo), 200)
    #     except jwt.PyJWTError as e:
    #         return make_response(jsonify({'message': str(e)}), 401)

    # edit email and profile picture
    def put(self):
        usertoken = request.headers.get('Authorization')
        token = usertoken.split('Bearer ')[1]
        data = request.form.get('userProfile')
        json_data = json.loads(data)
        new_email = json_data.get("email", "")
        password = json_data.get("password")
        pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        pic = None
        if 'profilePic' in request.files:
            pic = request.files['profilePic']
        try:
            email_update = db.users.find_one({
                "email": new_email
            })
            if email_update:
                return make_response(jsonify({"message": "Email sudah digunakan"}), 400)
            payload = jwt.decode(token, SECRET_KEY, ALGO)
            userinfo = db.users.find_one({
                "email": payload["email"], "password": pw_hash
            })

            if userinfo:
                recent_filepath = userinfo['profile_picture']
                filter_query = {'email': userinfo['email']}

                if new_email == payload["email"]:
                    return make_response(jsonify({"message": "Email tidak boleh sama"}), 400)
                if new_email and pic:
                    updatePic = UpdatePhotoProfile()
                    new_filename_db = updatePic.updatePhoto(
                        pic, recent_filepath)
                    update_operation = {
                        "$set": {"profile_picture": new_filename_db, "email": new_email}}
                    db.users.update_one(filter_query, update_operation)
                    payload = {
                        'email': new_email,
                        'exp': datetime.now(timezone.utc) + timedelta(seconds=60 * 60 * 24)}
                    new_token = jwt.encode(payload, SECRET_KEY, ALGO)
                    return make_response(jsonify({"message": "Berhasil update email dan foto!", "newtoken": new_token}), 200)
                elif new_email is not None and pic is None:
                    update_operation = {"$set": {"email": new_email}}
                    db.users.update_one(
                        filter_query, update_operation)
                    payload = {
                        'email': new_email,
                        'exp': datetime.now(timezone.utc) + timedelta(seconds=60 * 60 * 24)}
                    new_token = jwt.encode(payload, SECRET_KEY, ALGO)
                    return make_response(jsonify({"message": "Berhasil update email!", "newtoken": new_token}), 200)
                elif pic is not None:
                    updatePic = UpdatePhotoProfile()
                    new_filename_db = updatePic.updatePhoto(
                        pic, recent_filepath)
                    update_operation = {
                        "$set": {"profile_picture": new_filename_db}}
                    db.users.update_one(
                        filter_query, update_operation)
                    del userinfo['password']
                    userinfo['_id'] = str(userinfo['_id'])
                    userinfo['profile_picture'] = new_filename_db
                    return make_response(jsonify({"message": "Berhasil update foto", "newtoken": token, "user": userinfo}), 200)
            else:
                return make_response(jsonify({"message": "Password salah"}), 401)
        except jwt.PyJWTError as e:
            return make_response(jsonify({'message': str(e)}), 401)


@app.route("/api/user/profile/password", methods=["PUT"])
def put_password():
    usertoken = request.headers.get('Authorization')
    token = usertoken.split('Bearer ')[1]
    data = request.form.get('updatePass')
    json_data = json.loads(data)
    new_password = json_data["new_password"]
    recent_password = json_data["recent_password"]
    pw_hash = hashlib.sha256(recent_password.encode("utf-8")).hexdigest()
    new_pw_hash = hashlib.sha256(new_password.encode("utf-8")).hexdigest()
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGO)
        userinfo = db.users.find_one(
            {"email": payload['email'], "password": pw_hash})
        if userinfo:
            # Update password
            filter_query = {'email': userinfo['email']}
            update_operation = {"$set": {"password": new_pw_hash}}
            db.users.update_one(filter_query, update_operation)
            return make_response(jsonify({"message": "Password Berhasil di update!"}), 200)
        return make_response(jsonify({"message": "Password salah!"}), 400)
    except jwt.PyJWTError as e:
        return make_response(jsonify({'message': str(e)}), 401)


class UserSuratKematian(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        usertoken = token.split('Bearer ')[1]
        if usertoken is None:
            return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
        if usertoken:
            payload = jwt.decode(usertoken, SECRET_KEY, ALGO)
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo is None:
                return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
            if userinfo:
                data = request.form.get('data')
                json_data = json.loads(data)
                fileupload = request.files['file']
                nama = json_data['nama']
                tempat_lahir = json_data['tempat_lahir']
                tanggal_lahir = json_data["tanggal_lahir"]
                jenis_kelamin = json_data["gender"]
                agama = json_data["agama"]
                tempat_meninggal = json_data["tempat_meninggal"]
                tanggal_meninggal = json_data["tanggal_meninggal"]
                penyebab = json_data["sebab_meninggal"]

                if fileupload:
                    filename = secure_filename(fileupload.filename)
                    extension = filename.split(".")[-1]
                    new_filename = f' Berkas Kematian-{nama}.{extension}'
                    # Menetapkan nama file baru ke properti filename
                    fileupload.filename = new_filename

                drive_api = GoogleDriveAPI()
                folder_id = FOLDER_KEMATIAN
                file_url = drive_api.upload_pdf(
                    folder_id, fileupload, fileupload.filename)
                surat_kelahiran_id = db.surat_kematian.insert_one({
                    "nama": nama,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tanggal_lahir,
                    "jenis_kelamin": jenis_kelamin,
                    "agama": agama,
                    "tempat_meninggal": tempat_meninggal,
                    "tanggal_meninggal": tanggal_meninggal,
                    "penyebab": penyebab,
                    "file_url": file_url,
                    "user_id":  str(userinfo['_id']),
                    "status": "pending",
                    "pesan": '',
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat kematian berhasil dibuat",
                "surat_kelahiran_id": str(surat_kelahiran_id)
            }), 201)


class UserSuratKelahiran(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        usertoken = token.split('Bearer ')[1]
        if usertoken is None:
            return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
        if usertoken:
            payload = jwt.decode(usertoken, SECRET_KEY, ALGO)
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo is None:
                return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
            if userinfo:
                data = request.form.get('data')
                json_data = json.loads(data)
                fileupload = request.files['file']
                nama = json_data['nama']
                tempat_lahir = json_data['tempat_lahir']
                tgl_lahir = json_data["tanggal_lahir"]
                gender = json_data["gender"]
                ayah = json_data["ayah"]
                ibu = json_data["ibu"]
                anak = json_data["anak"]

                if fileupload:
                    filename = secure_filename(fileupload.filename)
                    extension = filename.split(".")[-1]
                    new_filename = f' Berkas Kelahiran-{nama}.{extension}'
                    # Menetapkan nama file baru ke properti filename
                    fileupload.filename = new_filename

                drive_api = GoogleDriveAPI()
                folder_id = FOLDER_KELAHIRAN
                file_url = drive_api.upload_pdf(
                    folder_id, fileupload, fileupload.filename)
                surat_kematian_id = db.surat_kelahiran.insert_one({
                    "nama": nama,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tgl_lahir,
                    "jenis_kelamin": gender,
                    "nama_ayah": ayah,
                    "nama_ibu": ibu,
                    "anak_ke": anak,
                    # Menggunakan variabel yang benar
                    "file_url": file_url,
                    "user_id":  str(userinfo['_id']),
                    "status": "pending",
                    "pesan": '',
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat kelahiran berhasil dibuat",
                "surat_kematian_id": str(surat_kematian_id)
            }), 201)


class UserSuratSKTM(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        usertoken = token.split('Bearer ')[1]
        if usertoken is None:
            return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
        if usertoken:
            payload = jwt.decode(usertoken, SECRET_KEY, ALGO)
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo is None:
                return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
            if userinfo:
                data = request.form.get('data')
                json_data = json.loads(data)
                fileupload = request.files['file']
                nama = json_data['nama']
                tempat_lahir = json_data['tempat_lahir']
                tanggal_lahir = json_data["tanggal_lahir"]
                jenis_kelamin = json_data["gender"]
                agama = json_data["agama"]
                pekerjaan = json_data["pekerjaan"]
                status_pernikahan = json_data["status_pernikahan"]
                pendidikan_terakhir = json_data["pendidikan_terakhir"]
                alamat = json_data["alamat"]
                nik = json_data["nik"]
                anggota_keluarga = json_data["anggota_keluarga"]
                pendapatan_bulanan = json_data["pendapatan_bulanan"]

                if fileupload:
                    filename = secure_filename(fileupload.filename)
                    extension = filename.split(".")[-1]
                    new_filename = f' Berkas SKTM-{nama}.{extension}'
                    # Menetapkan nama file baru ke properti filename
                    fileupload.filename = new_filename

                drive_api = GoogleDriveAPI()
                folder_id = FOLDER_SKTM
                file_url = drive_api.upload_pdf(
                    folder_id, fileupload, fileupload.filename)
                surat_sktm_id = db.surat_sktm.insert_one({
                    "nama": nama,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tanggal_lahir,
                    "jenis_kelamin": jenis_kelamin,
                    "agama": agama,
                    "pekerjaan": pekerjaan,
                    "status_perkawinan": status_pernikahan,
                    "pendidikan_terakhir": pendidikan_terakhir,
                    "alamat": alamat,
                    "nik": nik,
                    "anggota_keluarga": anggota_keluarga,
                    "pendapatan_bulanan": pendapatan_bulanan,
                    "file_url": file_url,
                    "user_id":  str(userinfo['_id']),
                    "status": "pending",
                    "pesan": '',
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat SKTM berhasil dibuat",
                "surat_sktm_id": str(surat_sktm_id)
            }), 201)


class UserSuratDomisili(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        usertoken = token.split('Bearer ')[1]
        if usertoken is None:
            return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
        if usertoken:
            payload = jwt.decode(usertoken, SECRET_KEY, ALGO)
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo is None:
                return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
            if userinfo:
                data = request.form.get('data')
                json_data = json.loads(data)
                fileupload = request.files['file']
                nama = json_data['nama']
                tempat_lahir = json_data['tempat_lahir']
                tanggal_lahir = json_data["tanggal_lahir"]
                jenis_kelamin = json_data["gender"]
                pekerjaan = json_data["pekerjaan"]
                alamat = json_data["alamat"]

                if fileupload:
                    filename = secure_filename(fileupload.filename)
                    extension = filename.split(".")[-1]
                    new_filename = f' Berkas Domisili-{nama}.{extension}'
                    # Menetapkan nama file baru ke properti filename
                    fileupload.filename = new_filename

                drive_api = GoogleDriveAPI()
                folder_id = FOLDER_DOMISILI
                file_url = drive_api.upload_pdf(
                    folder_id, fileupload, fileupload.filename)
                surat_domisili_id = db.surat_domisili.insert_one({
                    "nama": nama,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tanggal_lahir,
                    "jenis_kelamin": jenis_kelamin,
                    "pekerjaan": pekerjaan,
                    "alamat": alamat,
                    "file_url": file_url,
                    "user_id":  str(userinfo['_id']),
                    "status": "pending",
                    "pesan": '',
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat Domisili berhasil dibuat",
                "surat_domisili_id": str(surat_domisili_id)
            }), 201)


class UserPengaduan(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        usertoken = token.split('Bearer ')[1]
        if usertoken is None:
            return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
        if usertoken:
            payload = jwt.decode(usertoken, SECRET_KEY, ALGO)
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo is None:
                return make_response(jsonify({'message': 'User Not Authenticated'}), 401)
            if userinfo:
                data = request.form.get('data')
                json_data = json.loads(data)
                fileupload = None
                if 'file' in request.files:
                    fileupload = request.files['file']
                nama = json_data['nama']
                pesan = json_data['pesan']
                tanggal = json_data["tanggal"]

                file_url = None

                if fileupload:
                    filename = secure_filename(fileupload.filename)
                    extension = filename.split(".")[-1]
                    new_filename = f' Berkas Pengaduan-{nama}.{extension}'
                    # Menetapkan nama file baru ke properti filename
                    fileupload.filename = new_filename
                    drive_api = GoogleDriveAPI()
                    folder_id = FOLDER_PENGADUAN
                    file_url = drive_api.upload_pdf(
                        folder_id, fileupload, fileupload.filename)

                surat_pengaduan_id = db.pengaduan.insert_one({
                    "nama": nama,
                    "pesan": pesan,
                    "tanggal": tanggal,
                    "file_url": file_url,
                    "status": "pending",
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Pengaduan berhasil dibuat",
                "surat_pengaduan_id": str(surat_pengaduan_id)
            }), 201)


class UserStatus(Resource):
    def get(self):
        usertoken = request.headers.get('Authorization')
        if not usertoken or 'Bearer ' not in usertoken:
            return make_response(jsonify({'message': 'Authorization token is missing or invalid'}), 401)
        token = usertoken.split('Bearer ')[1]
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo:
                user_id = str(userinfo['_id'])

                Kelahiran = list(db.surat_kelahiran.find(
                    {"user_id": user_id}).sort("created_At", -1))
                for doc in Kelahiran:
                    doc['_id'] = str(doc['_id'])
                Kematian = list(db.surat_kematian.find(
                    {"user_id": user_id}).sort("created_At", -1))
                for doc in Kematian:
                    doc['_id'] = str(doc['_id'])
                Domisili = list(db.surat_domisili.find(
                    {"user_id": user_id}).sort("created_At", -1))
                for doc in Domisili:
                    doc['_id'] = str(doc['_id'])
                SKTM = list(db.surat_sktm.find({"user_id": user_id}).sort(
                    "created_At", -1))
                for doc in SKTM:
                    doc['_id'] = str(doc['_id'])
                return make_response(jsonify({"Kelahiran": Kelahiran, "Kematian": Kematian, "Domisili": Domisili, "SKTM": SKTM}), 200)
        except jwt.PyJWTError as e:
            return make_response(jsonify({'message': str(e)}), 401)

    def delete(self):
        usertoken = request.headers.get('Authorization')
        token = usertoken.split('Bearer ')[1]
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            userinfo = db.users.find_one({
                "email": payload["email"]
            })
            if userinfo:
                user_id = str(userinfo['_id'])
                item_id = ObjectId(request.args.get('item_id'))
                jenis = request.args.get('jenis')

                if jenis == 'kelahiran':
                    item_url = db.surat_kelahiran.find_one({
                        "_id": item_id
                    })
                    file_url = item_url['file_url']
                    drive_api = GoogleDriveAPI()
                    folder_id = FOLDER_KELAHIRAN
                    drive_api.delete_file(folder_id, file_url)
                    item = db.surat_kelahiran.delete_one(
                        {'user_id': user_id, '_id': item_id})
                    if item.deleted_count == 1:
                        return make_response(jsonify({'success': True, 'message': 'Data berhasil dihapus'}), 200)
                    else:
                        return make_response(jsonify({'success': False, 'message': 'Data tidak ditemukan atau gagal dihapus'}), 400)
                if jenis == 'kematian':
                    item_url = db.surat_kematian.find_one({
                        "_id": item_id
                    })
                    file_url = item_url['file_url']
                    drive_api = GoogleDriveAPI()
                    folder_id = FOLDER_KEMATIAN
                    drive_api.delete_file(folder_id, file_url)
                    item = db.surat_kematian.delete_one(
                        {'user_id': user_id, '_id': item_id})
                    if item.deleted_count == 1:
                        return make_response(jsonify({'success': True, 'message': 'Data berhasil dihapus'}), 200)
                    else:
                        return make_response(jsonify({'success': False, 'message': 'Data tidak ditemukan atau gagal dihapus'}), 400)
                if jenis == 'domisili':
                    item_url = db.surat_domisili.find_one({
                        "_id": item_id
                    })
                    file_url = item_url['file_url']
                    drive_api = GoogleDriveAPI()
                    folder_id = FOLDER_DOMISILI
                    drive_api.delete_file(folder_id, file_url)
                    item = db.surat_domisili.delete_one(
                        {'user_id': user_id, '_id': item_id})
                    if item.deleted_count == 1:
                        return make_response(jsonify({'success': True, 'message': 'Data berhasil dihapus'}), 200)
                    else:
                        return make_response(jsonify({'success': False, 'message': 'Data tidak ditemukan atau gagal dihapus'}), 400)
                if jenis == 'sktm':
                    item_url = db.surat_sktm.find_one({
                        "_id": item_id
                    })
                    file_url = item_url['file_url']
                    drive_api = GoogleDriveAPI()
                    folder_id = FOLDER_SKTM
                    drive_api.delete_file(folder_id, file_url)
                    item = db.surat_sktm.delete_one(
                        {'user_id': user_id, '_id': item_id})
                    if item.deleted_count == 1:
                        return make_response(jsonify({'success': True, 'message': 'Data berhasil dihapus'}), 200)
                    else:
                        return make_response(jsonify({'success': False, 'message': 'Data tidak ditemukan atau gagal dihapus'}), 400)
        except jwt.PyJWTError as e:
            return make_response(jsonify({'message': str(e)}), 401)


# ADMIN  ROUTES


class AdminLogin(Resource):
    def post(self):
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        admin = db.admin.find_one({"email": email, "password": pw_hash})

        if admin:
            payload = {
                'email': email,
                'exp': datetime.now(timezone.utc) + timedelta(seconds=60 * 60 * 24)
            }
            token = jwt.encode(payload, SECRET_KEY, ALGO)
            return jsonify({"result": "success", "token": token, "email": email})
        return {"message": "Email atau password salah"}, 401

    def get(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        if token:
            try:
                payload = jwt.decode(
                    token,
                    SECRET_KEY,
                    ALGO
                )
                admininfo = db.admin.find_one({'email': payload['email']})
                print(admininfo)
                if admininfo:
                    del admininfo['password']
                    admininfo['_id'] = str(admininfo['_id'])
                    return make_response(jsonify({'loggedIn': True, 'data': admininfo}), 200)
                else:
                    return make_response(jsonify({'message': 'Invalid token'}), 401)
            except jwt.PyJWTError as e:
                return make_response(jsonify({'message': str(e)}), 401)
        return jsonify({'loggedIn': False})


class AdminDashboard(Resource):
    def get(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                data_user = list(db.users.find())
                for d in data_user:
                    d['_id'] = str(d['_id'])

                data_penduduk = list(db.data_penduduk.find())
                # Menghitung total penduduk
                total_penduduk = len(data_penduduk)

                def calculate_age(birth_date):
                    birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
                    today = datetime.today()
                    age = today.year - birth_date.year - \
                        ((today.month, today.day) <
                         (birth_date.month, birth_date.day))
                    return age

                # Menghitung total penduduk dalam rentang usia tertentu
                total_penduduk_1_20 = sum(1 for penduduk in data_penduduk if 1 <= calculate_age(
                    penduduk['tanggal_lahir']) <= 20)
                total_penduduk_21_40 = sum(1 for penduduk in data_penduduk if 21 <= calculate_age(
                    penduduk['tanggal_lahir']) <= 40)
                total_penduduk_41_60 = sum(1 for penduduk in data_penduduk if 41 <= calculate_age(
                    penduduk['tanggal_lahir']) >= 60)

                # Menghitung total penduduk yang berpendidikan SD/SMP/SMK/S1/tidak bersekolah
                total_penduduk_smk = db.data_penduduk.count_documents(
                    {'pendidikan_terakhir': 'SLTA/SMA/SMK/MA'})
                total_penduduk_smp = db.data_penduduk.count_documents(
                    {'pendidikan_terakhir': 'SMP/SLTP'})
                total_penduduk_sd = db.data_penduduk.count_documents(
                    {'pendidikan_terakhir': 'SD/MI'})
                total_penduduk_sarjana = db.data_penduduk.count_documents(
                    {'pendidikan_terakhir': 'Sarjana S1'})
                total_penduduk_tidak_sekolah = db.data_penduduk.count_documents(
                    {'pendidikan_terakhir': 'Tidak Bersekolah'})

                # Menampilkan status pernikahan
                sudah_menikah = sum(1 for penduduk in data_penduduk if penduduk.get(
                    'status_pernikahan') == 'Sudah Menikah')
                belum_menikah = sum(1 for penduduk in data_penduduk if penduduk.get(
                    'status_pernikahan') == 'Belum Menikah')

                # Menghitung jumlah penduduk di masing-masing dusun
                total_penduduk_pandanwangi = sum(
                    1 for penduduk in data_penduduk if penduduk.get('dusun') == 'Pandanwangi')
                total_penduduk_beyan = sum(
                    1 for penduduk in data_penduduk if penduduk.get('dusun') == 'Beyan')
                total_penduduk_bencal = sum(
                    1 for penduduk in data_penduduk if penduduk.get('dusun') == 'Bencal')
                total_penduduk_butuh = sum(
                    1 for penduduk in data_penduduk if penduduk.get('dusun') == 'Butuh')

                return make_response(jsonify({
                    "users": data_user,
                    "total_penduduk": total_penduduk,
                    "total_penduduk_1_20": total_penduduk_1_20,
                    "total_penduduk_21_40": total_penduduk_21_40,
                    "total_penduduk_41_60": total_penduduk_41_60,
                    "total_penduduk_smk": total_penduduk_smk,
                    "total_penduduk_smp": total_penduduk_smp,
                    "total_penduduk_sd": total_penduduk_sd,
                    "total_penduduk_sarjana": total_penduduk_sarjana,
                    "total_penduduk_tidak_sekolah": total_penduduk_tidak_sekolah,
                    "sudah_menikah": sudah_menikah,
                    "belum_menikah": belum_menikah,
                    "total_penduduk_pandanwangi": total_penduduk_pandanwangi,
                    "total_penduduk_beyan": total_penduduk_beyan,
                    "total_penduduk_bencal": total_penduduk_bencal,
                    "total_penduduk_butuh": total_penduduk_butuh,
                }), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)


class KelolaPenduduk(Resource):
    def post(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)

        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                data = request.get_json()
                nama = data["nama"]
                jenis_kelamin = data["jenis_kelamin"]
                tempat_lahir = data["tempat_lahir"]
                tanggal_lahir = data["tanggal_lahir"]
                alamat = data["alamat"]
                dusun = data["dusun"]
                pekerjaan = data["pekerjaan"]
                pendidikan_terakhir = data["pendidikan_terakhir"]
                status_pernikahan = data["status_pernikahan"]

                if None in (nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, dusun, pekerjaan, pendidikan_terakhir, status_pernikahan):
                    return make_response(jsonify({'message': 'Data tidak lengkap'}), 400)

                count = db.data_penduduk.count_documents({})
                num = count + 1

                doc = {
                    "num": num,
                    "nama": nama,
                    "jenis_kelamin": jenis_kelamin,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tanggal_lahir,
                    "alamat": alamat,
                    "dusun": dusun,
                    "pekerjaan": pekerjaan,
                    "pendidikan_terakhir": pendidikan_terakhir,
                    "status_pernikahan": status_pernikahan,
                }
                db.data_penduduk.insert_one(doc)
                return {"result": "success"}
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)

    def get(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                data_penduduk = list(db.data_penduduk.find())
                for d in data_penduduk:
                    d['_id'] = str(d['_id'])
                return jsonify(data_penduduk)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)

    def put(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)

        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                data = request.get_json()
                doc_id = ObjectId(data.get('_id'))
                nama = data.get('nama')
                jenis_kelamin = data.get('jenis_kelamin')
                tempat_lahir = data.get('tempat_lahir')
                tanggal_lahir = data.get('tanggal_lahir')
                alamat = data.get('alamat')
                dusun = data.get('dusun')
                pekerjaan = data.get('pekerjaan')
                pendidikan_terakhir = data.get('pendidikan_terakhir')
                status_pernikahan = data.get('status_pernikahan')

                data = db.data_penduduk.update_one({"_id": doc_id}, {'$set': {
                    "nama": nama,
                    "jenis_kelamin": jenis_kelamin,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tanggal_lahir,
                    "alamat": alamat,
                    "dusun": dusun,
                    "pekerjaan": pekerjaan,
                    "pendidikan_terakhir": pendidikan_terakhir,
                    "status_pernikahan": status_pernikahan,
                }})
                return make_response(jsonify({'results': 'Sukses'}), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)

    def delete(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                doc_id = ObjectId(request.args.get('doc_id'))
                db.data_penduduk.delete_one(
                    {'_id': doc_id})
                return make_response(jsonify({'result': 'Sukses'}), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)


class DataPenduduk(Resource):
    def get(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]

        try:
            payload = jwt.decode(token, SECRET_KEY, ALGO)
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:

                def count_documents(dusun, filters):
                    return {f"total_{k}_{dusun}": db.data_penduduk.count_documents({'dusun': dusun, **filters})
                            for k, filters in filters.items()}

                results = {}
                for dusun in ['Pandanwangi', 'Bencal', 'Beyan', 'Butuh']:
                    results.update(count_documents(dusun, {
                        'laki_laki': {'jenis_kelamin': 'Laki-Laki'},
                        'pr': {'jenis_kelamin': 'Perempuan'},
                        'menikah': {'status_pernikahan': 'Sudah Menikah'},
                        'smk': {'pendidikan_terakhir': {'$in': ['SLTA/SMA/SMK/MA', 'Sarjana S1']}}
                    }))

                total_pandanwangi = db.data_penduduk.count_documents(
                    {'dusun': 'Pandanwangi'})
                total_bencal = db.data_penduduk.count_documents(
                    {'dusun': 'Bencal'})
                total_beyan = db.data_penduduk.count_documents(
                    {'dusun': 'Beyan'})
                total_butuh = db.data_penduduk.count_documents(
                    {'dusun': 'Butuh'})

                return jsonify({
                    **results,
                    'total_pandanwangi': total_pandanwangi,
                    'total_bencal': total_bencal,
                    'total_beyan': total_beyan,
                    'total_butuh': total_butuh,
                })
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)


class DataPelayanan(Resource):
    def get(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                # List data pelayanan
                data_kelahiran = list(db.surat_kelahiran.find())
                for d in data_kelahiran:
                    d['_id'] = str(d['_id'])

                data_kematian = list(db.surat_kematian.find())
                for d in data_kematian:
                    d['_id'] = str(d['_id'])

                data_domisili = list(db.surat_domisili.find())
                for d in data_domisili:
                    d['_id'] = str(d['_id'])

                data_sktm = list(db.surat_sktm.find())
                for d in data_sktm:
                    d['_id'] = str(d['_id'])

            # Total Keseluruhan data pelayanan
                total_kelahiran = db.surat_kelahiran.count_documents({})
                total_domisili = db.surat_domisili.count_documents({})
                total_kematian = db.surat_kematian.count_documents({})
                total_sktm = db.surat_sktm.count_documents({})

            # total pengajuan diterima
                kelahiran = db.surat_kelahiran.count_documents(
                    {'status': 'diterima'})
                domisili = db.surat_domisili.count_documents(
                    {'status': 'diterima'})
                kematian = db.surat_kematian.count_documents(
                    {'status': 'diterima'})
                sktm = db.surat_sktm.count_documents({'status': 'diterima'})

            # total pengajuan ditolak
                tolak_kelahiran = db.surat_kelahiran.count_documents(
                    {'status': 'ditolak'})
                tolak_domisili = db.surat_domisili.count_documents(
                    {'status': 'ditolak'})
                tolak_kematian = db.surat_kematian.count_documents(
                    {'status': 'ditolak'})
                tolak_sktm = db.surat_sktm.count_documents(
                    {'status': 'ditolak'})

                total = total_kelahiran + total_kematian + total_domisili + total_sktm
                total_diterima = kelahiran + domisili + kematian + sktm
                total_ditolak = tolak_kelahiran + tolak_domisili + tolak_kematian + tolak_sktm

                return make_response(jsonify({
                    'total_surat': total,
                    'total_diterima': total_diterima,
                    'total_ditolak': total_ditolak,
                    'kelahiran': data_kelahiran,
                    'kematian': data_kematian,
                    'domisili': data_domisili,
                    'sktm': data_sktm,
                }), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)

    # validate
    def put(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)

        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                data = request.get_json()
                status = data.get('status')
                pesan = data.get('pesan')
                jenis = data.get('jenis')
                doc_id = ObjectId(data.get('doc_id'))

                if jenis == 'kelahiran':
                    data = db.surat_kelahiran.find_one({'_id': doc_id})
                    if status == 'diterima':
                        bulan = {1: "Januari", 2: "Februari", 3: "Maret", 4: "April", 5: "Mei", 6: "Juni",
                                 7: "Juli", 8: "Agustus", 9: "September", 10: "Oktober", 11: "November", 12: "Desember"}
                        tanggal_lahir = datetime.strptime(
                            data['tanggal_lahir'], "%Y-%m-%d")
                        # Ubah format tanggal lahir menjadi "hari bulan tahun" dengan bulan dalam bahasa Indonesia
                        tanggal_lahir_str = f"{tanggal_lahir.day} {
                            bulan[tanggal_lahir.month]} {tanggal_lahir.year}"
                        # Simpan kembali ke data
                        data['tanggal_lahir'] = tanggal_lahir_str
                        nama = data.get('nama')

                        htmlToPdf = PdfCrowd()
                        pdf_surat = htmlToPdf.uploadValidateSurat(data, jenis)
                        extension = "pdf"  # Tetapkan ekstensi file
                        new_filename = f'Surat Kelahiran-{nama}.{extension}'

                        drive_api = GoogleDriveAPI()
                        folder_id = FOLDER_SURAT_KELAHIRAN
                        file_url = drive_api.upload_pdf(
                            folder_id, pdf_surat, new_filename)
                        db.surat_kelahiran.update_one(
                            {'_id': doc_id}, {'$set': {'status': status, 'acc_file_url': file_url}})
                        print('print', file_url)
                    else:
                        db.surat_kelahiran.update_one(
                            {'_id': doc_id}, {'$set': {'status': status, 'pesan': pesan}})

                    return make_response(jsonify({'result': 'Sukses'}), 200)

                if jenis == 'kematian':
                    data = db.surat_kematian.find_one({'_id': doc_id})
                    # convert tanggal
                    if status == 'diterima':
                        bulan = {1: "Januari", 2: "Februari", 3: "Maret", 4: "April", 5: "Mei", 6: "Juni",
                                 7: "Juli", 8: "Agustus", 9: "September", 10: "Oktober", 11: "November", 12: "Desember"}
                        tanggal_lahir = datetime.strptime(
                            data['tanggal_lahir'], "%Y-%m-%d")
                        # Ubah format tanggal lahir menjadi "hari bulan tahun" dengan bulan dalam bahasa Indonesia
                        tanggal_lahir_str = f"{tanggal_lahir.day} {
                            bulan[tanggal_lahir.month]} {tanggal_lahir.year}"
                        tanggal_meninggal = datetime.strptime(
                            data['tanggal_meninggal'], "%Y-%m-%d")
                        tanggal_meninggal_str = f"{tanggal_meninggal.day} {
                            bulan[tanggal_meninggal.month]} {tanggal_meninggal.year}"
                        # Simpan kembali ke data
                        data['tanggal_lahir'] = tanggal_lahir_str
                        data['tanggal_meninggal'] = tanggal_meninggal_str

                        nama = data.get('nama')

                        htmlToPdf = PdfCrowd()
                        pdf_surat = htmlToPdf.uploadValidateSurat(data, jenis)
                        extension = "pdf"  # Tetapkan ekstensi file
                        new_filename = f'Surat Kematian-{nama}.{extension}'
                        # Menetapkan nama file baru ke properti filename

                        drive_api = GoogleDriveAPI()
                        folder_id = FOLDER_SURAT_KEMATIAN
                        file_url = drive_api.upload_pdf(
                            folder_id, pdf_surat, new_filename)
                        db.surat_kematian.update_one(
                            {'_id': doc_id}, {'$set': {'status': status,  'acc_file_url': file_url}})
                        print('print', file_url)
                    else:
                        db.surat_kematian.update_one(
                            {'_id': doc_id}, {'$set': {'status': status, 'pesan': pesan}})
                    return make_response(jsonify({'result': 'Sukses'}), 200)
                if jenis == 'domisili':
                    data = db.surat_domisili.find_one({'_id': doc_id})
                    if status == 'diterima':
                        nama = data.get('nama')
                        bulan = {1: "Januari", 2: "Februari", 3: "Maret", 4: "April", 5: "Mei", 6: "Juni",
                                 7: "Juli", 8: "Agustus", 9: "September", 10: "Oktober", 11: "November", 12: "Desember"}
                        tanggal_lahir = datetime.strptime(
                            data['tanggal_lahir'], "%Y-%m-%d")
                        # Ubah format tanggal lahir menjadi "hari bulan tahun" dengan bulan dalam bahasa Indonesia
                        tanggal_lahir_str = f"{tanggal_lahir.day} {
                            bulan[tanggal_lahir.month]} {tanggal_lahir.year}"
                        data['tanggal_lahir'] = tanggal_lahir_str

                        htmlToPdf = PdfCrowd()
                        pdf_surat = htmlToPdf.uploadValidateSurat(data, jenis)
                        extension = "pdf"  # Tetapkan ekstensi file
                        new_filename = f'Surat Domisili-{nama}.{extension}'

                        drive_api = GoogleDriveAPI()
                        folder_id = FOLDER_SURAT_DOMISILI
                        file_url = drive_api.upload_pdf(
                            folder_id, pdf_surat, new_filename)
                        db.surat_domisili.update_one(
                            {'_id': doc_id}, {'$set': {'status': status, 'acc_file_url': file_url}})
                        print('print', file_url)
                    else:
                        db.surat_domisili.update_one(
                            {'_id': doc_id}, {'$set': {'status': status, 'pesan': pesan}})
                    return make_response(jsonify({'result': 'Sukses'}), 200)

                if jenis == 'sktm':
                    data = db.surat_sktm.find_one({'_id': doc_id})
                    if status == 'diterima':
                        nama = data.get('nama')

                        bulan = {1: "Januari", 2: "Februari", 3: "Maret", 4: "April", 5: "Mei", 6: "Juni",
                                 7: "Juli", 8: "Agustus", 9: "September", 10: "Oktober", 11: "November", 12: "Desember"}
                        tanggal_lahir = datetime.strptime(
                            data['tanggal_lahir'], "%Y-%m-%d")
                        # Ubah format tanggal lahir menjadi "hari bulan tahun" dengan bulan dalam bahasa Indonesia
                        tanggal_lahir_str = f"{tanggal_lahir.day} {
                            bulan[tanggal_lahir.month]} {tanggal_lahir.year}"
                        data['tanggal_lahir'] = tanggal_lahir_str

                        htmlToPdf = PdfCrowd()
                        pdf_surat = htmlToPdf.uploadValidateSurat(data, jenis)
                        extension = "pdf"  # Tetapkan ekstensi file
                        new_filename = f'Surat SKTM-{nama}.{extension}'

                        drive_api = GoogleDriveAPI()
                        folder_id = FOLDER_SURAT_SKTM
                        file_url = drive_api.upload_pdf(
                            folder_id, pdf_surat, new_filename)
                        db.surat_sktm.update_one(
                            {'_id': doc_id}, {'$set': {'status': status,  'acc_file_url': file_url}})
                        print('print', file_url)
                    else:
                        db.surat_sktm.update_one(
                            {'_id': doc_id}, {'$set': {'status': status, 'pesan': pesan}})
                    return make_response(jsonify({'result': 'Sukses'}), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)


class DataPengaduan(Resource):
    def get(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )

            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                # list data pengaduan
                pengaduan = list(db.pengaduan.find())
                for d in pengaduan:
                    d['_id'] = str(d['_id'])

                # total status pending, diterima
                total_pending = db.pengaduan.count_documents({
                    'status': 'pending'})

                total_diterima = db.pengaduan.count_documents({
                    'status': 'diterima'})
                # total pengaduan masuk
                total = len(pengaduan)
                return make_response(jsonify({
                    'data': pengaduan,
                    'total': total,
                    'total_pending': total_pending,
                    'total_diterima': total_diterima,
                }), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)
    # validate pengaduan

    def put(self):
        admintoken = request.headers.get('Authorization')
        token = admintoken.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            admininfo = db.admin.find_one({'email': payload['email']})
            if admininfo:
                data = request.get_json()
                status = data.get('status')
                doc_id = ObjectId(data.get('doc_id'))
                db.pengaduan.update_one(
                    {'_id': doc_id}, {'$set': {'status': status}})
                return make_response(jsonify({'results': 'Sukses'}), 200)

        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)


api.add_resource(UserHomepage, "/api", methods=["GET"])
api.add_resource(UserRegister, "/api/register", methods=["POST"])
api.add_resource(UserLogin, "/api/userLogin", methods=["POST", "GET"])
# api.add_resource(UserDashboard, "/api/user/dashboard", methods=["GET"])
api.add_resource(UserProfile, "/api/user/profile",
                 methods=["GET", "PUT"])
api.add_resource(UserSuratKelahiran,
                 "/api/user/suratKelahiran", methods=["POST"])
api.add_resource(UserSuratKematian,
                 "/api/user/suratKematian", methods=["POST"])
api.add_resource(UserSuratSKTM,
                 "/api/user/suratSKTM", methods=["POST"])
api.add_resource(UserSuratDomisili,
                 "/api/user/suratDomisili", methods=["POST"])
api.add_resource(UserPengaduan,
                 "/api/user/pengaduan", methods=["POST"])
api.add_resource(UserStatus, "/api/user/status",
                 methods=["GET", "DELETE"])
# ROUTE ADMIN
api.add_resource(AdminLogin, "/api/adminLogin", methods=["POST", "GET"])
api.add_resource(AdminDashboard, "/api/admin/dashboard", methods=["GET"])
api.add_resource(DataPenduduk, "/api/admin/dataPenduduk", methods=["GET"])
api.add_resource(DataPelayanan, "/api/admin/dataPelayanan",
                 methods=["GET", "PUT"])
api.add_resource(DataPengaduan, "/api/admin/dataPengaduan",
                 methods=["PUT", "GET"])
api.add_resource(
    KelolaPenduduk, "/api/admin/dataPenduduk/kelolaPenduduk", methods=["POST", "GET", "PUT", "DELETE"])


if __name__ == '__main__':
    app.run(debug=True)
