module.exports = function (app, db) {
    app.post('/api/getchannels', async function (req, res) {
      console.log('Received request with: ', req.body.group);
      if (!req.body || !req.body.group) {
        return res.sendStatus(400);
      }
      
      const groupNames = req.body.group.split(',');
  
      channels = [];

      for (const groupName of groupNames) {
        group = await db.collection("group").findOne({ groupname: groupName });
  
        if (!group) {
          console.log('Group not found: ', groupName);
        } else {
          channels.push({ groupname: groupName, channels: group.channels });
        }
      }
  
      if (channels.length === 0) {
        return res.send({ error: 'No channels found for the provided groups' });
      }
  
      console.log('Obtaining channel data:', channels);
      return res.send({channels});
    });
  };