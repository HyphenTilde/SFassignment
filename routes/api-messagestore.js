module.exports = function (app, db){
    app.post('/api/messagestore', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }

        channelhistory = await db.collection("channelhistory").find({}).toArray();
        try{
            console.log(channelhistory);
            for( let i = 0 ; i < channelhistory.length ; i++ ){
                if(channelhistory[i].channelname == req.body.channelname){
                    db.collection('channelhistory').updateOne({ channelname: req.body.channelname }, {
                        $push: {
                            messages: req.body.message
                        }});
                    res.send();
                    return;
                } 
            }
            const myobj = { channelname: req.body.channelname, messages: [req.body.message] }
            db.collection('channelhistory').insertOne(myobj);
        } catch (err) {
            console.log("Error");
        }
    })
}