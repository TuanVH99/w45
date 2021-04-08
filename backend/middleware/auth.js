const jwt = require('jsonwebtoken');
const { findByUsername } = require('../controller/user');
const db = require('../database/index');
const User = require('../models/user');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
        if (err) {
    
            res.status(401).send(null)
        } else {
            const user = await findByUsername(data.username,2)
            if(!user){
                res.status(401).json({Error:"không tìm thấy người dùng"})
            } else {
                req.data = user;
                next()
            }
        }
    })
}


module.exports = jwtMiddleware

