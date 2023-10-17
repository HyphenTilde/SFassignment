module.exports = function (app, db){
    app.post('/api/removechannel', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        groups = await db.collection("group").find({}).toArray();
        
        console.log("We got here in remove channel.");
        try{
            for(let i = 0; i < groups.length; i++){
                console.log(groups);
                console.log(groups.length);
                for(let j = 0; j < groups[i].channels.length; j++){
                    if((req.body.groupname == groups[i].groupname) && ((req.body.username == groups[i].groupcreator) || (req.body.role == 'superadmin')) && (req.body.channelname == groups[i].channels[j])){
                        console.log('Removing channel.');
                        db.collection('group').updateOne({ groupname: req.body.groupname }, {
                            $pull: {
                                channels: req.body.channelname
                            }})
                        return res.send(groups);
                        } else if ((req.body.username != groups[i].groupcreator) && (req.body.role != 'superadmin')){
                    console.log('Cannot remove a channel from a group you do not administer.');
                    return;
                } console.log('This channel does not exist.'); } 
            } console.log('This group does not exist.');
                return;
            } catch (err) {
            console.log("Error removing channel");
            console.log(err);
        }
    })
}