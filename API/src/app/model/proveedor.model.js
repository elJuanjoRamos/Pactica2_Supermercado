const database = require('../../config/dbconnection');
var Proveedor = {};


Proveedor.delete = function(id, callback) {
    if (database) {
        var query = 'DELETE FROM Proveedor WHERE idProveedor =' + id
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







Proveedor.selectAll = function(callback) {
    if (database) {
        var consulta = 'SELECT * FROM Proveedor';
        database.query(consulta, function(error, resultado) {
            if (error) throw error;
            callback(resultado);
        });
    }
}

Proveedor.selectProveedor = function(idProveedor, callback) {
    if (database) {
        var consulta = 'SELECT * FROM Proveedor WHERE idProveedor =' + idProveedor;
        console.log(consulta)
        database.query(consulta, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}

Proveedor.insert = function(data, callback) {
    if (database) {
        database.query('CALL insert_proveedor(?, ?, ?)', [data.nombre, data.direccion, data.telefono],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}


Proveedor.update = function(data, callback) {
    if (database) {
        var query = 'CALL actualizar_proveedor("' + data.nombre + '","' + data.direccion + '","' +
            data.telefono + '",' + data.idProveedor + ')'
        database.query(query,
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback(resultado[0]);
                }
            });
    }
}

module.exports = Proveedor;