const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion ,ObjectId } = require('mongodb');


// middleware 
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.1n864lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();

   const productCollection = client.db("DressDazzle").collection("productCollection");


//  product collection 
        app.get("/products" , async(req , res) =>{
            const result = await productCollection.find().toArray()
            res.send(result)
        })

        app.get("/products/:id" , async(req ,res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); 
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome to DressDazzle')
})

app.listen(port, () => {
    console.log(`Dress dazzle on port ${port}`);
  });

