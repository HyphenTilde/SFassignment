module.exports = function (app, db){
    app.post('/api/messagedisplay', async function (req, res){
        console.log(req.body);
        if(!req.body){
            return res.sendStatus(400)
        }
        let messages = [];
        channelhistory = await db.collection("channelhistory").find({}).toArray();
        try{
            for( let i = 0 ; i < channelhistory.length ; i++ ){
                if(channelhistory[i].channelname == req.body.channelname){
                    if(channelhistory[i].messages.length < 5){
                        res.send(messages);
                    } else {
                        for(let j = channelhistory[i].messages.length ; j > channelhistory[i].messages.length - 6 ; j--){
                            messages.push(channelhistory[i].messages[j]);
                        } res.send(messages);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    })
}