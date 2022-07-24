

class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('cliente conectado')

            //TODO: Validar el JWT
            //Si el token no es valido, desconectar

            //TODO: Saber que usuario esta activo mediante el UID

            //TODO: Emitir todos los usuarios conectados

            //TODO: Socket join, uid

            //TODO: Escuchar cuando el cliente manda un mensaje
            //mensaje-personal

            //TODO: Disconnect
            //Marcar en bd que el usuario se desconecto

            //TODO: Emitir los usuarios conectados
            socket.on('disconnect', () => {
                console.log('cliente desconectado')
            })

        });
    }


}


module.exports = Sockets;