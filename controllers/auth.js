const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = async (req, res = response) => {



    res.json({
        ok: true,
        usuario: "new"
    })
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