module.exports = function (app, db){
    app.post('/api/removechatuser', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        user = await db.collection("user").find({}).toArray();
        groups = await db.collection("group").find({}).toArray();

        try{
            const rusername = req.body.rusername;
            const rgroup = req.body.rgroup;
            var chatter = {};
            chatter.id=0;
            chatter.userName = '';
            for(let i = 0; i < user.length; i++){
                console.log(user[i]);
                console.log(user.length);
                if((rusername == user[i].username)){
                    for(let j = 0; j < user[i].groups.length; j++){
                        if(req.body.username != groups[i].groupcreator){
                            console.log('You cannot remove user from a group you do not administer.');
                            return;
                        } else if (rgroup != user[i].group[j]){
                            console.log('User does not exist in this group.');
                            return;
                        }
                        else if ((rgroup == user[i].groups[j]) && ((req.body.username == groups[i].groupcreator) || (req.body.role == 'superadmin'))){
                            db.collection('user').updateOne({ username: rusername}, {
                                $pull: {
                                    groups: rgroup
                                }
                            });
                        } else {
                            console.log('Error removing user from group.');
                        }
                    }
                
                } 
            }
            res.send(chatter);
        } catch(err){
            console.log(err);
        }
    })
}
