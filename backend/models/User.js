const crypto = require('crypto');
const jwt = require('jsonwebtoken')
class User {
    _id;
    username;
    salt;
    hash;
    created;
    token;
    avatar;
    description;

    constructor(username) {
        this.username = username;
        this.created = (new Date())
    }

    generatePassword(password) {
        this.salt = crypto.randomBytes(128).toString("base64");
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    }
    verifyPassword(password, salt, hash) {
        const check = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
        // if(check == this.hash){
        //     return true;
        // } else {
        //     return false;
        // }
        return check === hash
    }
    setInfo(name, value) {
        this[name] = value
    }
    generateToken(){
        return jwt.sign({username:this.username},process.env.SECRET_KEY,{expiresIn:3600})
    }
}

module.exports = User;