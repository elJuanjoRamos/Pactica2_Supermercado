var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//IMPORTAR ROUTES
var authRoute = require('./app/routes/authenticate.routes');
var usuarioRoute = require('./app/routes/usuario.routes');
var proveedorRoute = require('./app/routes/proveedor.routes')
var productoRoute = require('./app/routes/producto.routes')

//var service = require('./services');
var app = express();
var port = 3000;
var uri = '/api/v1/';

//CONFIGURACION VISTA
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//CONFIGURACION DE BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/', authRoute);
app.use(uri, usuarioRoute);
app.use(uri, proveedorRoute);
app.use(uri, productoRoute);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(err);
    next;
});

app.listen(port, function() {
    console.log("El servidor esta corriendo puerto: " + port);
});