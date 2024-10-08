const express= require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors({
    origin:['https://sortify-client.web.app/','http://localhost:5173']
}))
app.use(express.json())

const uri = "mongodb+srv://arifhossainaslam6:6tDFpGkPmA6UjPiG@cluster0.bxt1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const productCollection = client.db('Sortify').collection('products')
    app.get('/products', async(req,res ) =>{
        const result = await productCollection.find().toArray();
        res.send(result)
    })

    app.get('/productCount',async (req,res) =>{
      const count = await productCollection.estimatedDocumentCount()
      res.send(count)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res) =>{
    res.send('Sortify is running')
})
app.listen(port,() =>{
    console.log(`Sortify is running is ${port}`);
})