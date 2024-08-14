// const express = require('express')
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

dotenv.config()
app.use(bodyparser.json())
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();
const dbName = 'passOp';
app.use(cors())


app.get('/', cors(), async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
  
app.post('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const passoword = req.body
    //const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    const insertResult = await collection.insertOne(passoword);
    res.send({success: true, result: insertResult})
})

app.delete('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const passoword = req.body
    //const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    const deleteResult = await collection.deleteOne(passoword);
    res.send({success: true, result: deleteResult})
})




// // // Database Name
// //const dbName = 'passOp';

// // async function main() {
// //     // Use connect method to connect to the server
// //     await client.connect();
// //     console.log('Connected successfully to server');
    

// //     // the following code examples can be pasted here...

// //     return 'done.';
// // }

// // main()
// //     .then(console.log)
// //     .catch(console.error)
// //     .finally(() => client.close());


// console.log(process.env.MONGO_URI)


 







app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})