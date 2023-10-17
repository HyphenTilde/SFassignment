module.exports = function (app, db){
    app.post('/api/createchannel', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        groups = await db.collection("group").find({}).toArray();
        
        console.log("We got here in create channel.");
        try{
            for(let i = 0; i < groups.length; i++){
                console.log(groups);
                console.log(groups.length);
                if((req.body.groupname == groups[i].groupname) && ((req.body.username == groups[i].groupcreator) || (req.body.role == 'superadmin'))){
                    console.log('Creating channel.');
                    const myobj = { channels: req.body.channelname } ;
                    db.collection('group').updateOne({ groupname: req.body.groupname }, {
                        $push: {
                            channels: req.body.channelname
                        }})
                    return res.send(groups);
                } else if ((req.body.username != groups[i].groupcreator) && (req.body.role != 'superadmin')){
                    console.log('Cannot add a channel to a group you do not administer.');
                    return;
                }
                } console.log('This group does not exist.');
                return;
            } catch (err) {
            console.log("Error creating channel");
            console.log(err);
        }
    })
}