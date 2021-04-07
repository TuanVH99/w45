const {
    ObjectId
} = require('bson')
const db = require('./index')

const userAction = {}

userAction.createUser = async (newUser) => {
    const raw = await db.users.insertOne({
        username: newUser.username,
        salt: newUser.salt,
        hash: newUser.hash,
        created: newUser.created
    })
    return (raw.ops[0])
}


userAction.findById = async (id, option = 1) => {
    if (option == 0) {
        const raw = await db.users.findOne({
            _id: ObjectId(id)
        });
        return raw
    } else {
        const raw = await db.users.findOne({
            _id: ObjectId(id)
        }, {
            projection: {
                hash: 0,
                salt: 0,
                token: 0
            }
        });
        return raw
    }

}
userAction.findByUsername = async (username, option = 1) => {
    if (option == 1) {
        const raw = await db.users.findOne({
            username: username
        }, {
            projection: {
                hash: 0,
                salt: 0,
                token: 0
            }
        });
        return raw
    } else {
        const raw = await db.users.findOne({
            username: username
        });
        return raw
    }

}
userAction.update = async (user, update) => {
    const result = await db.users.updateOne(user, {
        $set:{...update}
    })
}

module.exports = userAction