const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('test');
});

//let userList = new Map();

userList = [
    {
      id: 1,
      username: "Official_Alexa",
      email: "alexa55@gmail.com",
      pwd: "Cupcake7",
      role: ["superadmin"],
      groups: ["group1", "group2", "group3"]

    },
    {
      id: 2,
      username: "MoltenJones",
      email: "moltenjones@gmail.com",
      pwd: "Bronze33",
      role: ["groupadmin"],
      groups: ["group1", "group2"]

    },
    {
      id: 3,
      username: "BriannaBanana",
      email: "briannaban@gmail.com",
      pwd: "Hammer64",
      role: ["user"],
      groups: ["group1", "group3"]

    }
  ]



function loginUser(userName, id){
    if (!userList.has(userName)){
        console.log("Invalid user.");
    } else {
        userList.get(userName).add(id);
    }
}



http.listen(3000, () => {
    console.log('Server is running');
});

