const express = require('express');
const bodyParser = require('body-parser');

const institucionRouter = express.Router();

institucionRouter.use(bodyParser.json());

institucionRouter.route('/:institucionId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Este metodo retornara la lista de instituciones');
})
.post((req, res, next) => {
    res.end('Se agregara la institución ' + req.body.name + ' que esta ubicada en : ' + req.body.address);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /instituciones');
})
.delete((req, res, next) => {
    res.end('Eliminando todos las instituciones');
});

module.exports = institucionRouter;