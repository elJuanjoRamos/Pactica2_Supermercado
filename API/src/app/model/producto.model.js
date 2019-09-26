const database = require('../../config/dbconnection');
var Producto = {};



Producto.selectAll = function(callback) {
    if (database) {
        var consulta = 'SELECT * FROM Producto';
        database.query(consulta, function(error, resultado) {
            if (error) throw error;
            callback(resultado);
        });
    }
}

Producto.selectProducto = function(idProducto, callback) {
    if (database) {
        var consulta = 'SELECT * FROM Producto WHERE idProducto = ?';
        database.query(consulta, idProducto, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}
Producto.selectProveedorProducto = function(idProducto, callback) {
    if (database) {
        var consulta = 'select * from ProveedorProducto where Producto_idProducto = ' + idProducto;
        database.query(consulta, function(error, resultado) {
            console.log(resultado)
            if (error) {
                throw error;
            } else {
                callback(resultado);
            }
        });
    }
}

Producto.insert = function(data, callback) {
    if (database) {
        console.log(data);
        database.query('CALL insert_producto(?, ?,?, ?, ?)', [data.nombre, data.cantidad, data.img, data.precioVenta, data.descripcion],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    var query = 'CALL insert_producto_proveedor(?)'
                    for (let i = 0; i < data.proveedores.length; i++) {
                        const element = data.proveedores[i];
                        database.query(query, [element.idProveedor], function(err, res) {
                            if (err) {
                                throw err;
                            } else {}
                        });
                    }
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}

Producto.insertProviders = function(data, callback) {
    if (database) {
        console.log(data);
        database.query('CALL insert_producto(?, ?,?, ?, ?)', [data.nombre, data.cantidad, data.img, data.precioVenta, data.descripcion],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}


Producto.delete = function(id, callback) {
    if (database) {
        var query = 'DELETE FROM Producto WHERE idProducto =' + id
        database.query(query,
            function(error, resultado) {
                if (error) {
                    console.log(error);
                    throw error;
                } else {
                    console.log('esta');
                    callback({ "mensaje": "Eliminado" });
                }
            });
    }
}


Producto.update = function(data, callback) {
    if (database) {

        database.query('CALL actualizar_producto(?, ?,?, ?, ?, ?)', [data.nombre, data.cantidad, data.img, data.precioVenta, data.descripcion, data.idProducto],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback(resultado[0]);
                    var query = 'DELETE FROM ProveedorProducto WHERE Producto_idProducto =' + data.idProducto
                    database.query(query, function(err, res) {
                        if (err) {
                            throw err;
                        } else {
                            var query = 'CALL insert_producto_proveedor_agregado(?, ?)'
                            for (let i = 0; i < data.proveedores.length; i++) {
                                const element = data.proveedores[i];
                                database.query(query, [element.idProveedor, data.idProducto], function(err, res) {
                                    if (err) {
                                        throw err;
                                    } else {}
                                });
                            }
                        }
                    })
                }
            });
    }
}

module.exports = Producto;