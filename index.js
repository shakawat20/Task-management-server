const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 7000;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.obhaluk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    client.connect();
    const database = client.db('task_management');
    const taskCollection = database.collection('tasks');
    const bioCollection = database.collection('bio')



    app.post('/task', async (req, res) => {
      const task = req?.body;
      const addingTask = await taskCollection.insertOne(task)

      res.send(addingTask)

    })
    app.get('/tasks', async (req, res) => {
      const tasks = await taskCollection.find().toArray();
      res.send(tasks)

    })

    app.post('/bio', async (req, res) => {
      const bio = req?.body;
      console.log("post",bio)
      const insertBio = await bioCollection.insertOne(bio)
      res.send(insertBio)

    })

    app.get('/bio/:id', async (req, res) => {
      const bio = req?.params.id;
      console.log(bio)
    
      try {
        // Check if bio is a valid ObjectId before creating the query
        if (!ObjectId.isValid(bio)) {
          return res.status(400).send('Invalid ObjectId');
        }
    
        const query = { _id: new ObjectId(bio) };
        const insertBio = await bioCollection.findOne(query);
        res.send(insertBio);
      } catch (error) {
        console.error('Error fetching bio:', error);
        res.status(500).send('Internal Server Error');
      }
    });
    
    



    app.get('/', async (req, res) => {
      res.send("hello world  d")
    })
  }
  finally {

  }
}
run().catch(console.dir)



app.listen(PORT, () => {
  console.log('Server running')
})
