const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'assets');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = function (app, db){
    app.post('/api/changeprofilepic', upload.single('profilepic'), async function (req, res){
        console.log('Request Body: ', req.body);
        console.log('Request File: ', req.file);

        console.log(req.body);
        if(!req.file || !req.body.username){
            return res.sendStatus(400)
        }

        user = await db.collection("user").find({}).toArray();
        try{
             const username = req.body.username;
             const profilepic = fs.readFileSync(req.file.path, { encoding: 'base64' });

             const user = await db.collection('user').findOne({ username: username });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await db.collection('user').updateOne({ username: username }, { $set: { profilepic: profilepic } });

            res.status(200).json({ success: 'Profile picture changed successfully' });
            } catch (err) {
            console.log("Error: ", err);
            res.status(500).json({ error: 'Internal Server Error' });
            }
    });
};