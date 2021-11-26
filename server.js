// importar
const express = require('express');
const { Router } = require('express');
const { options } = require('./Bdconfig/mysql');
const { devoluciones } = require('./funciones/function');

// inicializar
const app = express();
const router = Router();
const conn = new devoluciones(options);

// settings
app.set('port', process.env.PORT || 3001);


// configurar 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// levantar servidor

const server = app.listen(app.get('port'), ()=>{
    console.log("escuchando en puerto "+app.get('port'));
});


// get inicia
router.get('', (req, res)=>{

    conn.selectProductos().then((row)=>{
        res.send(JSON.stringify(row));
    })
    .catch((error)=>{
        console.log(error);
    })
    

})

// buscar factura por id
router.get('/factura/:id', (req, res)=>{

        res.send('<h1>Funciona</h1>');
})


app.use('/api/devoluciones', router);