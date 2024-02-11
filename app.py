from datetime import datetime, timedelta, timezone
import hashlib
import secrets
import re
import os
from dotenv import load_dotenv
import jwt
import json
from bson import ObjectId
from flask import Flask, jsonify, request, make_response
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
     r"/api/*": {"origins": "https://kkp.dimsomnia.cloud", "supports_credentials": True, "methods": ["GET", "POST", "PUT", "DELETE"]}})

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


class UpdatePhotoProfile:
    def updatePhoto(self, pic, recent_filepath):
        # generate random string
        random_str = ''.join(secrets.choice(
            'abcdefghijklmnopqrstuvwxyz1234567890') for i in range(5))
        print(random_str)
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
        print(token)
        if token:
            try:
                payload = jwt.decode(
                    token,
                    SECRET_KEY,
                    ALGO
                )
                userinfo = db.users.find_one({'email': payload['email']})
                print(userinfo)
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
        print(existing_nik)

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
            token = jwt.encode(payload, SECRET_KEY, ALGO)
            return make_response(jsonify({"result": "success", "token": token}), 200)
        return make_response(jsonify({"message": "Email atau password salah"}), 401)

    def get(self):
        usertoken = request.headers.get('Authorization')
        token = usertoken.split('Bearer ')[1]
        print(token)
        payload = jwt.decode(
            token, SECRET_KEY, ALGO
        )
        userinfo = db.users.find_one({"email": payload["email"]})
        if userinfo:
            return make_response(jsonify({"message": "User terautentikasi"}), 200)
        return make_response(jsonify({"message": "Token tidak valid"}), 401)


class UserProfile(Resource):
    def get(self):
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
                del userinfo["password"]
                print(userinfo)
                userinfo['_id'] = str(userinfo['_id'])
                return make_response(jsonify(userinfo), 200)
        except jwt.PyJWTError as e:
            return make_response(jsonify({'message': str(e)}), 401)

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
                    print(f'token before{token}')
                    print(f'token after{new_token}')
                    return make_response(jsonify({"message": "Berhasil update email!", "newtoken": new_token}), 200)
                elif pic is not None:
                    updatePic = UpdatePhotoProfile()
                    new_filename_db = updatePic.updatePhoto(
                        pic, recent_filepath)
                    update_operation = {
                        "$set": {"profile_picture": new_filename_db}}
                    db.users.update_one(
                        filter_query, update_operation)
                    return make_response(jsonify({"message": "Berhasil update foto", "newtoken": token}), 200)
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


class UserDashboard(Resource):
    def get(self):
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
                profile_pic = userinfo['profile_picture']
                return make_response(jsonify({'path': profile_pic}), 200)
            print(profile_pic)
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
                print(fileupload)

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
                print(fileupload)

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
                surat_kelahiran_id = db.surat_kelahiran.insert_one({
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
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat kelahiran berhasil dibuat",
                "surat_kelahiran_id": str(surat_kelahiran_id)
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
                print(fileupload)

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
                surat_kelahiran_id = db.surat_sktm.insert_one({
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
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat SKTM berhasil dibuat",
                "surat_kelahiran_id": str(surat_kelahiran_id)
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
                surat_kelahiran_id = db.surat_domisili.insert_one({
                    "nama": nama,
                    "tempat_lahir": tempat_lahir,
                    "tanggal_lahir": tanggal_lahir,
                    "jenis_kelamin": jenis_kelamin,
                    "pekerjaan": pekerjaan,
                    "alamat": alamat,
                    "file_url": file_url,
                    "user_id":  str(userinfo['_id']),
                    "status": "pending",
                    "acc_file_url": None,
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Surat Domisili berhasil dibuat",
                "surat_kelahiran_id": str(surat_kelahiran_id)
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

                surat_kelahiran_id = db.pengaduan.insert_one({
                    "nama": nama,
                    "pesan": pesan,
                    "tanggal": tanggal,
                    "file_url": file_url,
                    "user_id":  str(userinfo['_id']),
                    "created_At": datetime.now(timezone.utc),
                    "updated_At": datetime.now(timezone.utc)
                }).inserted_id

            return make_response(jsonify({
                "message": "Pengaduan berhasil dibuat",
                "surat_kelahiran_id": str(surat_kelahiran_id)
            }), 201)


class UserStatus(Resource):
    def get(self):
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
                userinfo['_id'] = str(userinfo['_id'])
                user_id = userinfo['_id']

                del userinfo["password"]
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
                print(userinfo)
                return make_response(jsonify({"Kelahiran": Kelahiran, "Kematian": Kematian, "Domisili": Domisili, "SKTM": SKTM, "user_info": userinfo}), 200)
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
                print(item_id)
                print(jenis)

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


api.add_resource(UserHomepage, "/api", methods=["GET"])
api.add_resource(UserRegister, "/api/register", methods=["POST"])
api.add_resource(UserLogin, "/api/userLogin", methods=["POST", "GET"])
api.add_resource(UserDashboard, "/api/user/dashboard", methods=["GET"])
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

if __name__ == '__main__':
    app.run(debug=True)
