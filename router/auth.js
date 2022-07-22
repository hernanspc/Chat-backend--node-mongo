/*
    path:?
*/
const { Router } = require('express');
const { check } = require('express-validator');
//Controladores
const { crearUsuario, renewToken, login } = require('../controllers/auth');

const router = Router();

// Crear nuevos usuarios
router.post('/new', crearUsuario)

// Login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail()
], login)

// Revalidar Token
router.get('/renew', renewToken)


module.exports = router;