const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rsulfhn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  function verifyJWT(req, res, next)
  {
    const authHeader = req.headers.authorization;
    if(!authHeader)
      {
        return res.status(401).send('Unauthorized Access');
      }
      const token = authHeader.split (' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err)
        {
          return res.status(403).send({message : 'forbidden access'});
        }
        req.decoded = decoded;
        next();
      }); 
}

async function run() {
  try{
      const appointOptionCollection = client.db("dentalPoint").collection("appointmentOptions");
      const bookingsCollection = client.db('dentalPoint').collection('bookings');
      const usersCollection = client.db('dentalPoint').collection('users');

      app.get('/appointmentOptions', async(req, res) => {
        const date = req.query.date;
        const query = {};
        const options = await appointOptionCollection.find(query).toArray();
        const bookingQuery = {appointmentDate : date};
        const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();
        options.forEach(option => {
          const optionBooked = alreadyBooked.filter(book => book.treatment === option.name);
          const bookedSlots = optionBooked.map(book => book.slot);
          const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot));
          option.slots = remainingSlots;
          console.log(date, option.name, bookedSlots);
        })
        res.send(options);
      });

      app.get('/bookings', verifyJWT, async(req, res) => {
        const email = req.query.email;
        const decodedEmail = req.decoded.email;
        if(email !== decodedEmail){
          return res.status(403).send({message : 'forbidden access'});
        }
       const query = {email:email};
       const booking = await bookingsCollection.find(query).toArray();
       res.send(booking);
      });

      app.post('/bookings', async(req, res) => {
        const booking = req.body;
        const query = {
          appointmentDate: booking.appointmentDate,
          email: booking.email,
          treatment: booking.treatment,
        };
        const alreadyBooked = await bookingsCollection.find(query).toArray();
        if(alreadyBooked.length)
        {
          const message = `You have already booked on ${booking.appointmentDate}`;
         return res.send({acknowledged: false, message});
        }
        const result = await bookingsCollection.insertOne(booking);
        res.send(result);
      });

      app.get('/jwt', async(req, res) => {
        const email = req.query.email;
        const query = {email : email};
        const user = await usersCollection.findOne(query);
        if(user)
        {
          const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.send({accessToken : token});
        }
        res.status(403).send({accessToken : ''});
      });

      app.get("/users", async (req,res)=>{
        const query = {};
        const result = await usersCollection.find(query).toArray();
        res.send(result);
     });

      app.post('/users', async (req,res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
      });

      app.put('/users/admin/:id', async(req,res)=>{
        
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            role : 'admin'
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      });
  }
  finally
  {

  }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Dental point server is running');
  });
  
app.listen(port, () => {
console.log(`Dental point server is running on ${port} port`);
});