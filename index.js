var io = require("socket.io")(process.env.PORT || 3000);

//Custom Classes
var Player = require('./Classes/Player.js');


//Custom Library
const Debug = require("./lib/log/log.js");


var players = [];
var sockets = [];


Debug(`서버가 포트 ${process.env.PORT || 3000}에서 열렸습니다`);

io.on('connection', function(socket){
    Debug(`연결이 감지되었습니다. 소켓 아이디: ${socket.id}`)

    var player = new Player();
    var thisPlayerID = player.id;

    player[thisPlayerID] = player;
    socket[thisPlayerID] = socket;

    socket.on('disconnect', function() {
        Debug(`연결이 해제되었습니다. 소켓 아이디: ${socket.id}`)
        delete playes[thisPlayerID];
        delete sockets[thisPlayerID];
    })
})