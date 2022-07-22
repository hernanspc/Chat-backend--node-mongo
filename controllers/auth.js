const { response } = require('express');
const Usuario = require('../models/usuario');

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

        //TODO: encriptar contraseña


        //Guradar usuario en DB
        const usuario = new Usuario(req.body);
        await usuario.save();

        res.json({
            usuario
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;
    // const body = req.body;
    res.json({
        ok: true,
        usuario: "login",
        email, password
    })
}

const renewToken = async (req, res = response) => {
    res.json({
        ok: true,
        usuario: "renew"
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}