from datetime import datetime, timedelta, timezone
import hashlib
import os
from dotenv import load_dotenv
import jwt
from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
api = Api(app)
CORS(app, resources={
     r"/api/*": {"origins": "https://kkp.dimsomnia.cloud", "supports_credentials": True}})

MONGO_URL = os.getenv('MONGO_URL')
client = MongoClient(MONGO_URL)
db = client['kkp']
SECRET_KEY = 'LUWAKWHITECOFFEE'
ALGO = 'HS256'

USER_TOKEN = 'usertoken'
ADMIN_TOKEN = 'admintoken'


class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        longname = data['nama']
        nik = data['nik']
        alamat = data['alamat']
        email = data['email']
        password = data['password']
        pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        existing_user = db.users.find_one({"email": email})

        if existing_user:
            # Return a JSON-serializable dictionary
            return {'message': 'Email sudah digunakan!'}, 400

        db.users.insert_one({
            "long_name": longname,
            "nik": nik,
            "alamat": alamat,
            "email": email,
            "password": pw_hash,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        })

        # Return a JSON-serializable dictionary
        return {"result": "success"}


class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        user = db.users.find_one({"email": email, "password": pw_hash})

        if user:
            payload = {
                'email': email,
                'exp': datetime.now(timezone.utc) + timedelta(seconds=60 * 60 * 24)
            }
            token = jwt.encode(payload, SECRET_KEY, ALGO)
            return jsonify({"result": "success", "token": token})
        else:
            return {"message": "Email atau password salah"}, 401

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
                else:
                    return make_response(jsonify({'message': 'Invalid token'}), 401)
            except jwt.PyJWTError as e:
                return make_response(jsonify({'message': str(e)}), 401)
        return jsonify({'loggedIn': False})


class UserDashboard(Resource):
    def get(self):
        usertoken = request.cookies.token(USER_TOKEN)
        try:
            payload = jwt.decode(
                usertoken,
                SECRET_KEY,
                ALGO
            )
            print(payload)
            userinfo = db.users.find_one({
                "email": payload["email"],
            })
            if userinfo:
                del userinfo["password"]
                return make_response(jsonify(userinfo), 200)
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError, jwt.InvalidTokenError):
            return make_response(jsonify({'message': 'User not authenticated'}), 401)


class UserProfile(Resource):
    def get(self):
        usertoken = request.headers.get('Authorization')
        token = usertoken.split('Bearer ')[1]
        print(token)
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


api.add_resource(UserRegister, "/api/register", methods=["POST"])
api.add_resource(UserLogin, "/api/userLogin", methods=["POST", "GET"])
api.add_resource(UserDashboard, "/api/user/dashboard", methods=["GET"])
api.add_resource(UserProfile, "/api/user/profile", methods=["GET"])

if __name__ == '__main__':
    app.run(debug=True)
git
