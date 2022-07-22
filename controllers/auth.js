const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = async (req, res = response) => {



    res.json({
        ok: true,
        usuario: "ABC"
    })
}

const login = async (req, res = response) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }

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