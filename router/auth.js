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
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], login)

// Revalidar Token
router.get('/renew', renewToken)


module.exports = router;