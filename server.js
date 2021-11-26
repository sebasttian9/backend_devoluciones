// importar
const express = require('express');
const { Router } = require('express');
const { options } = require('./Bdconfig/mysql');

// inicializar
const app = express();
const router = Router();
const Port = 8080;

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
    res.send('<h1>Api devoluciones</h1>');
})

// buscar factura por id
router.get('/factura/:id', (req, res)=>{

})


app.use('/api/devoluciones', router);