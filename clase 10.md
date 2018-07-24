# Express
En este ejercicio, utilizaremos Express Framework para implementar una funcionalidad similar a la implementada por los servidores basados ​​en el módulo HTTP en el ejercicio anterior.

## Crear un servidor basico 
- dentro de la carpeta Node creamos una carpeta llamado ejemploExpress
- iniciamos un proyecto node con la instruccion `npm init` y agregar la instruccion start en scripts
- El archivo package.json debe quedar similar al siguiente 

```JSON
{
  "name": "express-with-node",
  "version": "0.0.1",
  "description": "Ejemplo node Expres",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "Danny Mora",
  "license": "ISC"
}
```
- Instalamos el framewor Express, en la consola escribimos 
```
npm install express --save
```
- Creamos un archivo llamado `.gitignore` y escribimos dentro 
```
node_modules/
```
- creamos un archivo llamado inde.js y agregamos el siguiente codigo 
```javascript
const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Mi servidor creado cno Express</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
```

- lanzamos el servidor 
```
npm start
```
- inicializamos el repositorio agregamos los archivos y hacemos git commit "ejemplo express"

## archivos publicos
- instalamos el modulo morgan escribiendo lo siguiente 
```
npm install morgan --save
```
actualizamos el index.js
```javascript

const morgan = require('morgan');

. . .

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

```

## Expresss router

Aqui desarrollaremos un servidor expres que exporte un REST API,  para implementarlo usaremos el framework Express y Express router.

## configurando un API 
- instalar body-parser, recomendación descargar postman
```
npm install body-parser --save
```

- Actualizamos el archivo index.js

```javascript
. . .

const bodyParser = require('body-parser');

. . .

app.use(bodyParser.json());

app.all('/estudiantes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/estudiantes', (req,res,next) => {
    res.end('Este metodo retornara la lista de estudiantes');
});

app.post('/estudiantes', (req, res, next) => {
 res.end('Se agregare el estudiante ' + req.body.name + ' que vive en : ' + req.body.address);
});

app.put('/estudiantes', (req, res, next) => {
  res.statusCode = 403;
  res.end('el metodo PUT no es soportado en  /estudiantes');
});
 
app.delete('/estudiantes', (req, res, next) => {
    res.end('Eliminando todos los estudiantes');
});

app.get('/estudiantes/:estudianteId', (req,res,next) => {
    res.end('Envia todos los detalles del estudiante con id: ' + req.params.estudianteId );
});

app.post('/estudiantes/:estudianteId', (req, res, next) => {
  res.statusCode = 403;
  res.end('la operacion POST no es soportada en  /estudiantes/'+ req.params.estudianteId);
});

app.put('/estudiantes/:estudianteId', (req, res, next) => {
  res.write('Actualizando datos del  estudiante: ' + req.params.estudianteId + '\n');
  res.end('Se actualizara al estudiante: ' + req.body.name + 
        ' con direccion: ' + req.body.address);
});

app.delete('/estudiantes/:estudianteId', (req, res, next) => {
    res.end('Eliminando al estudiante: ' + req.params.estudianteId);
});

. . .
```
- interactuar con el api
- hacer un commit "REST API"
- crear un archivo llamado `routes` dentro de la carpeta ejemploExpress.
- crear un archivo llamado `Router.js` en la carpeta de rutas y agregar el siguiete codigo 
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const estudianteRouter = express.Router();

estudianteRouter.use(bodyParser.json());

estudianteRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Este metodo retornara la lista de estudiantes');
})
.post((req, res, next) => {
    res.end('Se agregare el estudiante ' + req.body.name + ' que vive en : ' + req.body.address);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /estudiantes');
})
.delete((req, res, next) => {
    res.end('Eliminando todos los estudiantes');
});

module.exports = estudianteRouter;
```
- Eliminar las peticiones a la ruta /estudiantes del archivo index y agregar el siguiente codigo en el archivo index.js 
```javascript 
const estudianteRouter = require('./routes/estudianteRouter');
app.use('/estudiantes', estudianteRouter);

```
# Tarea 
Realizar una ruta asociada al proyecto y agregar el modulo en el archivo index.js
