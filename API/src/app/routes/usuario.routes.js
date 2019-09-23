var express = require('express');
var usuario = require('../model/usuario.model');
var usuarioRouter = express.Router();
var services = require('../model/tokenGenerator');


usuarioRouter.get('/ws/db/usuario/', function(req, res) {
    usuario.selectAll(function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay usuarios" });
        }
    });
});

usuarioRouter.get('/ws/db/usuario/:idUsuario', function(req, res) {
    var idUsuario = req.params.idUsuario;

    usuario.selectUsuario(idUsuario, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay usuarios" });
        }
    });
});

usuarioRouter.get('/ws/db/usuario/:idUsuario', function(req, res) {
    var idUsuario = req.params.idUsuario;

    usuario.delete(idUsuario, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay usuarios" });
        }
    });
});


usuarioRouter.delete('/ws/db/usuario/:idUsuario', /*services.verificar,*/ function(req, res, next) {
    var idUsuario = req.params.idUsuario;
    console.log(idUsuario);
    usuario.delete(idUsuario, function(resultado) {
        if (resultado && resultado.mensaje === "Eliminado") {
            res.json({ estado: true, mensaje: "Se elimino la usuario correctamente" });
        } else {
            res.json({ estado: false, mensaje: "No se elimino el usuario" });
        }
    });
});


usuarioRouter.post('/ws/db/usuario/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        pass: req.body.password,
        idRol: req.body.Rol_idRol,
    };
    usuario.insert(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se agrego el usuario"
            });
        } else {
            res.json({ "mensaje": "No se ingreso el contacto" });
        }
    });
});


usuarioRouter.put('/ws/db/usuario/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        pass: req.body.password,
        rol: req.body.Rol_idRol,
        idUsuario: c,
    }
    usuario.update(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se ha modificado con exito"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se pudo modificar"
            });
        }
    });
});


module.exports = usuarioRouter;