const {
    ObjectId
} = require('bson');
const db = require('../database');
const {createUser,login,findById} = require('../controller/user');


const router = require('express').Router();

router.get('/profile/:id', async (req, res) => {
    try{
        const result = await findById(req.params.id)
        res.json(result)
    }catch(e){
        res.status(400).json({Error:e.message})
    }
    
})
router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password)
        res.json(user)
    } catch (e) {
        console.log(e)
        res.status(403).json({
            Error: e.message
        })
    }
})

router.post('/sign-up', async (req, res) => {
    try {
        const createdUser = await createUser(req.body.username, req.body.password, req.body.confirmPassword)
        res.json(createdUser)
    } catch (e) {
        res.status(401).json({Error:e.message})
    }

})


module.exports = router