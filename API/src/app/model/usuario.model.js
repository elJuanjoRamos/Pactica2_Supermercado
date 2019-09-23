const database = require('../../config/dbconnection');
var Usuario = {};

Usuario.login = function(data, callback) {
    if (database) {
        var consulta = 'CALL autenticar(?, ?)';
        database.query(consulta, [data.username, data.password], function(error, resultado) {
            if (error) {
                throw error;
            } else {
                if (resultado[0].length > 0) {
                    callback(resultado[0]);
                } else {
                    callback(0);
                }
            }
        });
    }
}

Usuario.delete = function(id, callback) {
    if (database) {
        var query = 'DELETE FROM USUARIO WHERE idUsuario =' + id
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







Usuario.selectAll = function(callback) {
    if (database) {
        var consulta = 'SELECT * FROM Usuario';
        database.query(consulta, function(error, resultado) {
            if (error) throw error;
            callback(resultado);
        });
    }
}

Usuario.selectUsuario = function(idUsuario, callback) {
    if (database) {
        var consulta = 'SELECT * FROM Usuario WHERE idUsuario = ?';
        database.query(consulta, idUsuario, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}

Usuario.insert = function(data, callback) {
    if (database) {
        database.query('CALL insert_user(?, ?, ?, ?, ?)', [data.nombre, data.apellido, data.username, data.pass, data.idRol],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}


Usuario.update = function(data, callback) {
    if (database) {
        var query = 'CALL actualizar_usuario("' + data.nombre + '","' + data.apellido + '","' +
            data.username + '","' + data.pass + '",' + data.rol + ',' + data.idUsuario + ')'
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

module.exports = Usuario;