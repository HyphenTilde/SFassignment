module.exports = function (app, db){
    app.post('/api/deleteaccount', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        user = await db.collection("user").find({}).toArray();
        try{
            for(let i = 0; i < user.length; i++){
                console.log(user[i]);
                console.log(user.length);
                const myobj = { username: req.body.username };
                    await db.collection('user').deleteOne(myobj);
                }
            } catch (err) {
            console.log("Error deleting account");
            }
    })
}