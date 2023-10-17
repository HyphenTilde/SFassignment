module.exports = {
    connect: function(io, PORT){
        io.on('connection',(socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);

            socket.on('message', (msg)=> {
                console.log('message : ' + msg);
                console.log(msg.channel);
                socket.join(msg.channel);
                console.log(socket.rooms.has(msg.channel));
                io.to(msg.channel).emit('message', msg.sender + ': ' + msg.message);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('newchannel', (data)=>{
                socket.join(data);
                console.log('channel joined' + data);
                socket.emit('newchannel',{
                    channel:data
                });
            });
        });
    }
}