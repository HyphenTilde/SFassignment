module.exports = function (app, db) {
    app.post('/api/promote', async function (req, res) {
      console.log(req.body);
      if (!req.body) {
        return res.sendStatus(400);
      }
  
      const pusername = req.body.pusername;
      const user = await db.collection('user').findOne({ username: pusername });
  
      if (user) {
        console.log(user);
        console.log(user.role);
  
        if (user.role === 'user') {
          await db.collection('user').updateOne({ username: pusername }, { $set: { role: 'groupadmin' } });
        } else if (user.role === 'groupadmin') {
          await db.collection('user').updateOne({ username: pusername }, { $set: { role: 'superadmin' } });
        } else {
          console.log('Cannot promote!');
        }
  
        res.send({ message: 'User promotion successful.' });
      } else {
        console.log('This user does not exist');
        res.send({ message: 'User does not exist.' });
      }
    });
  };