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

    players[thisPlayerID] = player;
    socket[thisPlayerID] = socket;

    //클라이언트에 플레이어 서버 아이디 전달
    socket.emit('register', {id: thisPlayerID});
    socket.emit('spawn', player) //자신에게 소환되었다는걸 알림
    socket.broadcast.emit('spawn', player) //다른 플레이어에게도 알림

    for(var playerID in players){
        if(playerID != thisPlayerID){
            socket.emit('spawn', players[playerID]);
        }
    }

    socket.on('updatePosition', function(data) {
        player.position.x = data.position.x
        player.position.y = data.position.y;
        
        socket.broadcast.emit('updatePosition', player)
    })

    socket.on('disconnect', function() {
        Debug(`연결이 해제되었습니다. 소켓 아이디: ${socket.id}`)
        delete playes[thisPlayerID];
        delete sockets[thisPlayerID];
    })
})