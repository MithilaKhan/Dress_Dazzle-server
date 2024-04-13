const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware 
app.use(cors())
app.use(express.json());

const uri = "mongodb+srv://dress-dazzle:5jlEl3qpDCpMVbay@cluster0.1n864lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Dress dazzle on port ${port}`);
  });

//   
// 5jlEl3qpDCpMVbay 