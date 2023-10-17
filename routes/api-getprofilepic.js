const fs = require('fs');
const { ObjectId } = require('mongodb');

module.exports = function (app, db, fs){
    app.get('/api/getprofilepic/:username', async function (req, res) {
        try {
          const username = req.params.username;
          const user = await db.collection('user').findOne({ username: username });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          const profilePictureData = user.profilepic;
      
          if (!profilePictureData) {
            return res.status(404).json({ error: 'Profile picture not found' });
          }
      
          res.setHeader('Content-Type', 'image/jpeg');
          res.send(Buffer.from(profilePictureData, 'base64'));
        } catch (err) {
          console.log("Error: ", err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
};