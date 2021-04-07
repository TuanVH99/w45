const db = require('../database');
const userAction = require('../database/userAction');
const User = require('../models/User')
const jwt = require("jsonwebtoken");

const createUser = async (username, password, confirm) => {
    if (password !== confirm) {
        throw new Error("mật khâu xác thực không đúng")
    }

    const existedUser = await userAction.findByUsername(username)
    

    if (existedUser) {
        throw new Error("người dùng đã tồn tại");
    }
    const newUser = new User(username)
    newUser.generatePassword(password);
    // await db.user.insertOne({
    //     username: newUser.username,
    //     salt: newUser.salt,
    //     hash: newUser.hash,
    //     created: newUser.created
    // })
    const insertedUser = await userAction.createUser(newUser)
    console.log("controller:"+insertedUser)
    return insertedUser;
}
const login = async (username, password) => {
    const existedUser = await userAction.findByUsername(username,0)
   
    if (!existedUser) {
        throw new Error("người dùng không tồn tại");
    }
    const user = new User(existedUser.username);
    const check = user.verifyPassword(password, existedUser.salt, existedUser.hash);
    if (!check) {
        throw new Error("sai mật khẩu")
    }
    const token = jwt.sign({
        username: username,
    }, process.env.SECRET_KEY, {
        expiresIn: 1000
    })
    await userAction.update(existedUser,{token:token})
    user.setInfo("_id",existedUser._id)
    user.setInfo("hash",existedUser.hash)
    user.setInfo("salt",existedUser.salt)
    user.setInfo("token",token)
    console.log(user)
    return user;
}

const findById = async (id,option = 1) => {
    const result = await userAction.findById(id,option)
    if (result === null) {
        throw new Error("Người dùng không hợp lệ")
    } else {
        return result
    }
}

module.exports = {
    createUser,
    login,
    findById
}