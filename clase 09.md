# MOdulos NodeJs

## Objetivos 

* En este ejercicio, aprenderá a escribir aplicaciones de Node usando JavaScript y también aprenderá sobre los conceptos básicos de los módulos de Node. 
* Al final podrá: Escribe una aplicación de Node simple en JavaScript. Comprender los conceptos básicos de los módulos de nodo y escribir módulos de nodo basados ​​en archivos simples

# Iniciar una aplicación Node 
- Crear una carpeta llamada Node y dentro una carpeta llamada ejemplos 
- en la consola 'prompt' escribir `npm init` para inicializar un package.json en la carpeta ejemplos. Este comando iniciara la configuracion de un proyecto NodeJs
- Despues de seguir los pasos que inidica la consola ir al archivo pagckge.json y agregar un en script la intruccion start, debe quedar de la siguiente manera 

```JSON
{
  "name": "ejemplo-node",
  "version": "0.0.1",
  "description": "Ejemplo funciones, ES6, exports, modules",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "Danny Mora",
  "license": "ISC"
}

```
- Crear un archivo llamado `index.js` y agregar el siguiente codigo.

```javascript
  var rectangulo = {
    area: (a, b) => (a * b),
    perimetro: (a, b) => (2*(a + b)),
    per2: function (a, b) {
        return 2*(a + b);
    }
  }
  function calcularRect(l,b) {
    console.log("calculando el rectangulo con l = " + l + " y b = " + b);

    if (l <= 0 || b <= 0) {
        console.log("las dimenciones del rectagulos deben ser mayores que 0 :  l = "
               + l + ",  y b = " + b);
    }
    else {
	    console.log("el area del rectangulo es  " + rectangulo.area(l,b));
	    console.log("el perimetro del rectangulo  " + rectangulo.perimetro(l,b));
    }
  }
  calcularRect(10,-5);
  calcularRect(10,5);
  calcularRect(-10,5);
  calcularRect(10,0);
```
- Para ejecutar la aplicación, escribe en la consola 
```
npm start
```
- iniciar un repositorio con `git init` `add .` y hacer un commit "Ejemplo simple"

## Vamos a crear un modulo 
- Creamos un archivo llamado rectangulo.js, y agregamos el siguiente codigo 

```javascript
exports.area=(a,b)=>(a*b);
exports.perimetro=(a,b)=>(2*(a+b));
```

- Actualizamos el archivo index.js, Eliminamos el objeto `rectangulo` y reemplazamos por `var rectangulo = require('./rectangle');`
- Corremos la aplicación y debe dar el mismo resultado. 
- hacer un commit "modulo basico"

## Manejo de callback y errores 

- Creamos una carpeta llamada misModulos y dento un archivo llamado `rectCallback.js`
- Agregamos el siguiente codigo 

```javascript
module.exports=(x,y,callback) => {
    if(x<=0 || y<=0){
    var mensajeError="Las dimensiones son invalidas";
    callback(new Error(mensajeError),null);  
    }else{         
     var mensajeOk="El modulo Funciona";
     callback(null,mensajeOk)
    }
}
```
- Para usar este modulo en el index.js se debe llamar de la siguiete manera 
```javascript
var moduloRectangulo=require('./misModulos/rectCallback');
```
- Para hacer uso de este modulo se plantea la siguiente implementación
```javascript
RectanguloC(10,10,function(err,respuesta){
    if(err){
        console.log(err);
    }else{
      console.log("***FUNCIONA***");
      console.log(respuesta);
    }
})
``` 

## Temporizador Javascript 
```javascript
setTimeout(() => {
  //El codigo aqui se ejecuta 2 segundos despues 
}, 2000);
```

# Tarea 
- remplazar la respuesta en nuestro callback, ya no va a ser una cadena de texto, ahora van a agregar un objeto con las funciones de area y perimetro, sin argumentos, la operacion la realizan con `x` y `y`
- Simular la respuesta tardida como lo haria un servidor real procesando la operación  con la funcion `setTimeout` tanto para Error como no Error

- en el archivo `index.js` agregar el siguiente codigo 
```javascript
function calcularRectCallback(l,b) {
    console.log("calculando el rectangulo con l = " + l + " y b = " + b);

    moduloRectangulo(l,b, (err,respuesta) => {
      if (err) {
        console.log("ERROR: ", err.message);
	    }
      else {
        console.log("el area del rectangulo es  " + respuesta.area());
        console.log("el perimetro del rectangulo  " + respuesta.perimeter());
      }
    });
    console.log("----Se ejecuta despues de moduloRectangulo");
  }
  calcularRectCallback(10,-5);
  calcularRectCallback(10,5);
  calcularRectCallback(-10,5);
  calcularRectCallback(10,0);
```
- hacer commit "manejo de errores y callback"

# Recursos 
- [nodeJs ](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Documentación Node](https://nodejs.org/api/)
- [Node Modules ](https://nodejs.org/api/modules.html)
- [RequireJS](https://requirejs.org/)