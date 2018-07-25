const express = require('express'),
     http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
//uso de morgan
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

//uso del body-parses
app.use(bodyParser.json());

//uso del modulo routes
const estudianteRouter = require('./routes/estudianteRouter');
app.use('/estudiantes', estudianteRouter);

//uso del modulo instituciones
const institucionRouter = require('./routes/institucionRouter');
app.use('/instituciones', institucionRouter);

//app.use((req, res, next) => {
 // console.log(req.headers);
 // res.statusCode = 200;
 // res.setHeader('Content-Type', 'text/html');
 // res.end('<html><body><h1>Mi servidor creado con Express</h1></body></html>');

//});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});


// //metodos de manejo por api rest

// app.use(bodyParser.json());

// app.all('/estudiantes', (req,res,next) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   next();
// });

// app.get('/estudiantes', (req,res,next) => {
//     res.end('Este metodo retornara la lista de estudiantes');
// });

// app.post('/estudiantes', (req, res, next) => {
//     console.dir(req.body)
//  res.end('Se agregare el estudiante ' + req.body.name + ' que vive en : ' + req.body.address);
// });

// app.put('/estudiantes', (req, res, next) => {
//   res.statusCode = 403;
//   res.end('el metodo PUT no es soportado en  /estudiantes');
// });
 
// app.delete('/estudiantes', (req, res, next) => {
//     res.end('Eliminando todos los estudiantes');
// });

// app.get('/estudiantes/:estudianteId', (req,res,next) => {
//     res.end('Envia todos los detalles del estudiante con id: ' + req.params.estudianteId );
// });

// app.post('/estudiantes/:estudianteId', (req, res, next) => {
//   res.statusCode = 403;
//   res.end('la operacion POST no es soportada en  /estudiantes/'+ req.params.estudianteId);
// });

// app.put('/estudiantes/:estudianteId', (req, res, next) => {
//   res.write('Actualizando datos del  estudiante: ' + req.params.estudianteId + '\n');
//   res.end('Se actualizara al estudiante: ' + req.body.name + 
//         ' con direccion: ' + req.body.address);
// });

// app.delete('/estudiantes/:estudianteId', (req, res, next) => {
//     res.end('Eliminando al estudiante: ' + req.params.estudianteId);
// });