const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(http,{
  cors: {
      origin: '*',
      methods: ["GET", "POST"],
  }
});

const sockets = require('./sockets');
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

app.get('/', (req, res) => {
    res.send('test');
});
app.use(express.json());
app.use(cors());
app.use('/assets', express.static('assets'));



function loginUser(userName, id){
    if (!userList.has(userName)){
        console.log("Invalid user.");
    } else {
        userList.get(userName).add(id);
    }
}



http.listen(3000, () => {
    console.log('Server is running on Port: ' + port);
});

async function main(){
  const uri = 'mongodb://127.0.0.1:27017/chat';
  const client = new MongoClient(uri);
  try{
    await client.connect();
    let db = client.db('chat');
    await listDatabases(client);
    sockets.connect(io, port, db);
    require('./routes/api-removegroup.js')(app,db);
    require('./routes/api-login.js')(app,db);
    require('./routes/api-creategroup.js')(app,db);
    require('./routes/api-promote.js')(app,db);
    require('./routes/api-removechatuser')(app,db);
    require('./routes/api-getchannels.js')(app,db);
    require('./routes/api-registeruser.js')(app,db);
    require('./routes/api-deleteaccount.js')(app,db);
    require('./routes/api-createchannel.js')(app,db);
    require('./routes/api-removechannel.js')(app,db);
    require('./routes/api-modifygroup.js')(app,db);
    require('./routes/api-messagestore.js')(app,db);
    require('./routes/api-messagedisplay.js')(app,db);
    require('./routes/api-changeprofilepic.js')(app,db);
    require('./routes/api-getprofilepic.js')(app,db);
  } catch (e) {
    console.error(e);
  } finally {
    //await client.close()
  }
}

async function listDatabases(client){
  databasesList = await  client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
};

main().catch(console.error);

//mongoose.connect('mongodb://localhost:27017/chat');