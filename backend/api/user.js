const {
    ObjectId
} = require('bson');
const db = require('../database');

const router = require('express').Router();

router.get('/profile/:id', async (req, res) => {
    const user = await db.users.findOne({
        _id: ObjectId(req.params.id)
    },{projection:{hash:0,salt:0,token:0}})
    if(user===null){
        res.status(401).json({Error:"user not available"})
    }
    res.json(user)
})

module.exports = router