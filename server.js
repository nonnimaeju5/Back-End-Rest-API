// requiring express and initializing the app:
const express = require('express')
const app = express();
const PORT = 5002; // or you can use another port for example 5001

// requiring the cors middleware:
const cors = require('cors');
require('dotenv').config();

const { Pool } = require('pg') // this line is only needed for the PostgreSQL version
const pool = new Pool() // this line is only needed for the PostgreSQL version

/* const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://Vefskolinn:${process.env.Shjgmj2819}@cluster0.4l61g.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => console.log("connected!!",err) ) */



app.use(cors());// telling express to use the cors middleware
app.use(express.json())// telling express to accept json in body of POST requests

/* app.get('/',async (req,res)=>{ // listen to a get request
  const data = await pool.query('SELECT * from computers;')
  res.send(data.rows);
}) */

app.get('/p/blogs',async (req,res)=>{ // listen to a get request
  const data = await pool.query('SELECT * from blogs;')
  res.send(data.rows);
})

/* app.get('/m/blogs',async (req,res)=>{ // listen to a get request
  const collection = client.db("Blog").collection("blogs");
  const data = await collection.find().toArray();
  console.log("this is the data:", data);
  res.send(data);
}) */

app.post('/p/blog',async (req,res)=>{ // listen to a post request  
  console.log(req.body);
  const data = await pool.query(
    'INSERT INTO blogs(title, text, picture_url) VALUES($1, $2, $3) RETURNING *', 
    [req.body.title, req.body.text, req.body.picture]
  );
  res.send(data.rows);
})

/* app.post('/m/blog',async (req,res)=>{ // listen to a post request  
  console.log(req.body);

  const collection = client.db("Blog").collection("blogs");
  
  // perform actions on the collection object
  // find everything in the collection and turn it into an array:
  collection.insertOne(req.body).then(()=>{
    res.send({message:"success"})
  }).catch((e)=>{
    res.send(e);
  })
   
}) 

app.put('/m/blog/:blog', async function (req, res) {
  const collection = client.db("Blog").collection("blogs");
  const response = await collection.updateOne({_id: req.params.id}, req.body);
  res.send(response);
}) */


app.listen(PORT, ()=>{ // listen to the port we chose above
    // print to the console that the server is listening
    console.log("listening to port: " + PORT);
})

// UPDATE
app.put("/p/blog", (req, res) => { // listen to a put request
  pool.query(
    'UPDATE blogs2 SET title=$1, text=$2, picture_url=$3 where title=$4',
    [req.body.title, req.body.text, req.body.picture, req.body.oldTitle],
  ).then((result) => {
    res.send(result);
  }) .catch((e) => {
  console.log(e);
  res.send(e);
  })	
});


// DELETE
app.delete("/p/blog/:blog", (req, res) => { // listen to a put request
  pool.query(
    'DELETE FROM blogs2 WHERE title=$1',
    [req.body.title],
  ).then((result) => {
    res.send(result);
  }) .catch((e) => {
    res.send(e);
  })
});