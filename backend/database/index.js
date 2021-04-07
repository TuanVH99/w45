const mongodb = require('mongodb');
const url = process.env.DB_URL;
const client = new mongodb.MongoClient(url);
console.log(url)
const db = {};

client.connect(() => {
    console.log(`momgodb connected to: ` + url)
    const cookpad = client.db('cookpad');
    db.users = cookpad.collection("users");
    db.dishes = cookpad.collection("dishes");
})


module.exports = db;