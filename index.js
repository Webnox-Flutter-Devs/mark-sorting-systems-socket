var app = require('express')();
var http = require('http').Server(app);
const cors = require('cors');
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});


io.on('connection', function (socket) {
    console.log('NEW USER CONNECTED !');
    var myroom = socket.handshake.query.uid;
    socket.join(myroom);

    socket.on('disconnect', (data) => {
        console.log('USER DISCONNECTED !', data);
        socket.leave(myroom);
    })

    socket.on('mark_sort_emp_logout', function (data) {
        console.log('Employee Delete Event Called :- ', data);
        io.sockets.in(myroom).emit('mark_sort_emp_logout', data);
    });
});


app.get('/', cors(), function (req, res) {
    res.send("Server is running");
})

http.listen((process.env.PORT || 3000), function () {
    console.log('💥 YOUR WEBSOCKET IS RUNING 💥');
});