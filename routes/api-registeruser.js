module.exports = function (app, db){
    app.post('/api/register', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        try{
            const user = await db.collection("user").find({}).toArray();
            let isDuplicate = false;

            for(let i = 0; i < user.length; i++){
                console.log(user);
                console.log(user.length);
                if((req.body.username == user[i].username) || (req.body.email == user[i].email)){
                    isDuplicate = true;
                    console.log('Please input unique username or email.');
                    res.send('Please input unique username or email.');
                    break;
                } 
            }

            if (!isDuplicate){
                var myobj = { 
                    id: user.length+1,
                    username: req.body.username, 
                    email: req.body.email, 
                    pwd: req.body.password, 
                    role: 'user', 
                    groups: ['group1'],
                    profilepic: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                };
                db.collection('user').insertOne(myobj);
                console.log('Successfully registered user');
                res.send('User registration successful.');
            }
        } catch (err) {
        console.log("Error registering");
        }
    })
}