var mysql = require('mysql');

var params = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'dbPractica2',
    port: 3306
}

var connection = mysql.createConnection(params);


if (connection) {
    console.log('conexion establecida')
}


module.exports = connection;