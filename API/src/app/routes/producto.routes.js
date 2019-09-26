var express = require('express');
var producto = require('../model/producto.model');
var productoRouter = express.Router();
var services = require('../model/tokenGenerator');


productoRouter.get('/ws/db/producto/', function(req, res) {
    producto.selectAll(function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay productos" });
        }
    });
});

productoRouter.get('/ws/db/producto/:idProducto', function(req, res) {
    var idProducto = req.params.idProducto;

    producto.selectProducto(idProducto, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay productos" });
        }
    });
});

productoRouter.get('/ws/db/proveedor/producto/:idProducto', function(req, res) {
    var idProducto = req.params.idProducto;

    producto.selectProveedorProducto(idProducto, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay productos" });
        }
    });
});


productoRouter.delete('/ws/db/producto/:idProducto', /*services.verificar,*/ function(req, res, next) {
    var idProducto = req.params.idProducto;
    console.log(idProducto);
    producto.delete(idProducto, function(resultado) {
        if (resultado && resultado.mensaje === "Eliminado") {
            res.json({ estado: true, mensaje: "Se elimino la producto correctamente" });
        } else {
            res.json({ estado: false, mensaje: "No se elimino el producto" });
        }
    });
});


productoRouter.post('/ws/db/producto/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        descripcion: req.body.descripcion,
        precioVenta: req.body.precioVenta,
        img: req.body.img,
        proveedores: req.body.proveedores
    };
    producto.insert(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se agrego el producto"
            });
        } else {
            res.json({ "mensaje": "No se ingreso el contacto" });
        }
    });
});


productoRouter.put('/ws/db/producto/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        precioVenta: req.body.precioVenta,
        descripcion: req.body.descripcion,
        img: req.body.img,
        proveedores: req.body.proveedores,
        idProducto: c,
    }
    producto.update(data, function(resultado) {
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


module.exports = productoRouter;