const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config');
const hostname = config.HOST;
const port = config.PORT;

app.use('/', (req, resp, next) => {
    console.log('Hemos entrado en el recurso principal');
    next();
});

app.use('/Quiz', () => {
    express.static('public');
    console.log('En el QUIZ');
});

app.use('/home', router, () => {
    console.log('Dentro de HOME');
});

router.get('/info', (req, resp, next) => {
    console.log('Estamos en la página de info');
    resp.status(200).end();
});

router.get('/contact', (req, resp, next) => {
    console.log('Estamos en la página de contacto');
    resp.status(200).end();
    next();
});

router.get('/error', (req, resp, next) => {
    const err = 'Ha habido un error de sistema';
    next(err);
});

app.use((err, req, resp, next) => {
    console.log(`Error: ${err}`);
    resp.write(`Error: ${err}`);
    next();
})

app.use((req, resp) => {
    console.log('ENDPOINT FINAL');
    resp.status(200).end();
});

app.listen(port, hostname, () => {
    console.log(`Servidor levantado con éxito en http://${hostname}:${port}/`);
    console.log(`Entorno: ${process.env.NODE_ENV}`);
});
