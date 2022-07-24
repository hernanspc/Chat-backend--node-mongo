const {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios
} = require('../controllers/sockets');
const { verificarJWT } = require('../helpers/jwt')

class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            const [valido, uid] = verificarJWT(socket.handshake.query['x-token'])

            if (!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            //TODO: Validar el JWT
            //Si el token no es valido, desconectar

            //TODO: Saber que usuario esta activo mediante el UID

            //TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios())

            //TODO: Socket join, uid

            //TODO: Escuchar cuando el cliente manda un mensaje
            //mensaje-personal

            //TODO: Disconnect
            //Marcar en bd que el usuario se desconecto

            //TODO: Emitir los usuarios conectados
            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid)
                console.log('cliente desconectado ', uid)
            })

        });
    }


}


module.exports = Sockets;