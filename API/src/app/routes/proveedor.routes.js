var express = require('express');
var proveedor = require('../model/proveedor.model');
var proveedorRouter = express.Router();
var services = require('../model/tokenGenerator');


proveedorRouter.get('/ws/db/proveedor/', function(req, res) {
    proveedor.selectAll(function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay proveedors" });
        }
    });
});

proveedorRouter.get('/ws/db/proveedor/:id', function(req, res) {
    var id = req.params.id;
    proveedor.selectProveedor(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay Proveedores" });
        }
    });
});
proveedorRouter.get('/ws/db/proveedor/:idproveedor', function(req, res) {
    var idproveedor = req.params.idproveedor;

    proveedor.delete(idproveedor, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay proveedors" });
        }
    });
});


proveedorRouter.delete('/ws/db/proveedor/:idproveedor', /*services.verificar,*/ function(req, res, next) {
    var idproveedor = req.params.idproveedor;
    console.log(idproveedor);
    proveedor.delete(idproveedor, function(resultado) {
        if (resultado && resultado.mensaje === "Eliminado") {
            res.json({ estado: true, mensaje: "Se elimino la proveedor correctamente" });
        } else {
            res.json({ estado: false, mensaje: "No se elimino el proveedor" });
        }
    });
});


proveedorRouter.post('/ws/db/proveedor/', /*services.verificar,*/ function(req, res) {
    var data = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };
    proveedor.insert(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se agrego el proveedor"
            });
        } else {
            res.json({ "mensaje": "No se ingreso el contacto" });
        }
    });
});


proveedorRouter.put('/ws/db/proveedor/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        idProveedor: c
    }

    console.log(data);

    proveedor.update(data, function(resultado) {
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


module.exports = proveedorRouter;