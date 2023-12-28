const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());
const port = 7000;

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
         const taskCollection=database.collection('tasks');
        


        app.post('/task' ,async(req,res)=>{
          const task=req?.body;
          const addingTask=await taskCollection.insertOne(task)
          console.log("hell emon")
          res.send(addingTask)

        })
        app.get('/tasks',async(req,res)=>{
          const tasks=await taskCollection.find().toArray();
          res.send(tasks)
         
        })



        app.get('/', async (req, res) => {
            res.send("hello world")
        })
    }
    finally {

    }
}
run().catch(console.dir)



app.listen(port, () => {
    console.log('Server running')
})
