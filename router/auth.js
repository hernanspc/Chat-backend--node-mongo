/*
    path:?
*/
const { Router } = require('express');

const router = Router();

// Crear nuevos usuarios
router.post('/new', (req, res) => {

    res.json({
        ok: true,
        usuario: "ABC"
    })
})

// Login
router.post('/', (req, res) => {

    res.json({
        ok: true,
        usuario: "login"
    })
})


module.exports = router;

