module.exports = function (app, db){
    app.post('/api/creategroup', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        groups = await db.collection("group").find({}).toArray();
        user = await db.collection('user').find({}).toArray();

        console.log("We got here in create group.");
        try{
            var group = {};
            group.id=0;
            group.groupname = '';
            for(let i = 0; i < groups.length; i++){
                console.log(groups);
                console.log(groups.length);
                if((req.body.groupname == groups[i].groupname)){
                    console.log('A group with this name already exists. Please put in a unique name.');
                    return res.send(groups);
                } else if (i==groups.length-1){
                    console.log('This group does not exist, it shall be created.');
                    const myobj = { id: i+2, groupname: req.body.groupname, groupcreator:[req.body.username], channels: ['default'] };
                    db.collection('group').insertOne(myobj);
                    group.id = i+2;
                    db.collection('user').updateOne({ username: req.body.username }, {
                        $push: {
                            groups: req.body.groupname
                        }});
                    return res.send(group);
                }
            }
        } catch (err) {
            console.log("Error processing this stuff");
        }
    })
}