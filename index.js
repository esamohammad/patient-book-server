const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config()



const app = express()
const port = process.env.PORT || 5000;
//! json file import
const categories = require("./categories.json");




//!middlewear
app.use(cors())
app.use(express.json())



//!mongodb credentials
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q3vw58i.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        //!collection--DB
        const usersCollection = client.db('patient-book').collection('users');
        

        
        //!Users Get api- all Users 
        app.get('/users', async (req, res) => {
            const query = {};
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir);



//! data api get....(all Data api)
app.get('/categories', (req, res) => {
    res.send(categories)
})



app.get("/", (req, res) => {
    res.send("Patient Book is running on Server")
});



//! cmd showed window--
app.listen(port, () => {
    console.log(`Patient Book is running on port: ${port}`);
});