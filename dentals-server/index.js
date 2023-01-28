const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rsulfhn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
      const appointOptionCollection = client.db("dentalPoint").collection("appointmentOptions");
      const bookingsCollection = client.db('dentalPoint').collection('bookings');

      app.get('/appointmentOptions', async(req, res) => {
        const query = {};
        const options = await appointOptionCollection.find(query).toArray();
        res.send(options);
      });

      app.post('/bookings', async(req, res) => {
        const booking = req.body;
        const result = await bookingsCollection.insertOne(booking);
        res.send(result);
      })

  }
  finally{

  }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Dental point server is running');
  });
  
app.listen(port, () => {
console.log(`Dental point server is running on ${port} port`);
});