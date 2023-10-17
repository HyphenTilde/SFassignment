module.exports = function (app, db){
    app.post('/api/removegroup', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        groups = await db.collection("group").find({}).toArray();
        
        console.log("We got here in remove group.");
        try{
            var group = {};
            group.id=0;
            group.groupname = '';
            for(let i = 0; i < groups.length; i++){
                console.log(groups);
                console.log(groups.length);
                console.log(req.body.username);
                console.log(groups[i].groupcreator);
                console.log(req.body.role);
                if((req.body.groupname != groups[i].groupname)){
                    console.log('This group does not exist, and therefore cannot be removed.');
                } else if ((req.body.username != groups[i].groupcreator) && (req.body.role != 'superadmin')){
                    console.log('You cannot remove a group you do not administer.');
                } else {
                    console.log('This group shall now be removed.');
                    const myobj = { groupname: req.body.groupname };
                    await db.collection('group').deleteOne(myobj, function(err, res){
                        if (err) throw err;
                        console.log('1 document deleted.');
                        db.close();
                    });
                    group.id=1;
                    return res.send(group);
                }
            }
        } catch (err) {
            console.log("Error processing this stuff");
        }
    })
}