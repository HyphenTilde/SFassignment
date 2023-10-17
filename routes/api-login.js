module.exports = function (app, db){
    app.post('/api/auth', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        user = await db.collection("user").find({}).toArray();
        console.log("We got here.");
        try{
            console.log('AAAAAAAAAAA.');
            var chatter = {};
            chatter.id=0;
            chatter.userName = '';
            console.log('Just some random word.');
            for(let i = 0; i < user.length; i++){
                console.log(user[i]);
                console.log(user.length);
                if((req.body.username == user[i].username) && (req.body.password == user[i].pwd)){
                    console.log('I dunno.');
                    chatter.id = user[i].id;
                    chatter.email = user[i].email;
                    chatter.userName = user[i].username;
                    chatter.role = user[i].role;
                    chatter.groups = user[i].groups;
                    chatter.pwd = '';
                    chatter.profilepic = user[i].profilepic;
                }
            }
            res.send(chatter);
        } catch (err) {
            console.log("Error parsing userdata at login");
        }
    })
}