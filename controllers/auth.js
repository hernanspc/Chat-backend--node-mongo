const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        //verificar que email no exista
        const existeEmail = await Usuario.findOne({ email })
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario en DB
        await usuario.save();

        //Generar el JWT
        const token = await generarJWT(usuario.id, usuario.nombre)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

//Login
const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o password no encontrado'
            });
        }

        // Validar el password 
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto"
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);
        console.log('token ', token)

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
            // password: usuarioDB.password
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar un nuevo JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token,
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}