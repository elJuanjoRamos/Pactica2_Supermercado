var express = require('express');
var jwt = require('jsonwebtoken');
var user = require('../model/usuario.model');
var router = express.Router();

router.post('/auth/', function(req, res) {

    var data = {
        username: req.body.username,
        password: req.body.password
    }
    user.login(data, function(results) {
        if (typeof results[0] !== "undefined") {
            var token = 'Bearer ' + jwt.sign(JSON.parse(JSON.stringify(results[0])), 'shh', { expiresIn: '1h' });
            results[0].estado = true;
            results[0].mensaje = "Se autorizo el acceso";
            results[0].token = token;
            console.log(results[0]);
            res.json(JSON.parse(JSON.stringify(results[0])));
        } else {
            res.json({
                estado: false,
                mensaje: "Nick o ContraseĂ±a incorrecto/a"
            });
        }
    });
});


module.exports = router;