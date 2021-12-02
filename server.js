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

// ejemplo

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
  };
  
  app.use(myLogger);

//  fin ejemplo

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


// Devuelve todos los motivos de devolucion con estado 1
router.get('/motivosdevolucion', (req, res)=>{

        conn.selectMotivoDevolucion().then((row)=>{

            res.send(row);
        });
   
});

// buscar factura por id
router.get('/factura/:id/:rut', (req, res)=>{

            // res.send('<h1>Funciona</h1>');
    const id = req.params.id;
    const rut = req.params.rut;
    // console.log('id-->'+rut);
    if(!id){

        res.send({'error':'id es requerido'});

    }else{
        conn.selectInfoFactura(id,rut).then((row)=>{

                // console.log(row);
            res.send(row);
        });
    }
})

// REGRESA INFORMACION DEL CLIENTE QUE INGRESO AL SISTEMA
router.get('/client/:id?', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    const id = req.params.id;
    // console.log('id-->'+id);
    if(!id){

        res.send({'error':'id es requerido'});

    }else{
        conn.selectInfoCliente(id).then((row)=>{

            res.send(row);
        });
    }

})



// Busqueda por Codigo interno o codigo de fabrica
router.get('/producto/:id/:rut', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    const id = req.params.id;
    const rut = req.params.rut;
    // console.log('id-->'+id);
    if(!id){

        res.send({'error':'id es requerido'});

    }else{
        conn.selectProdEnFactura(id,rut).then((row)=>{

            res.send(row);
        });
    }

})



//https://cl.lafetechocolat.com/mercadoPago.php?srt=18&pago=3&ottPs=MzM4Mjkz&&collection_id=18484464112&collection_status=approved&payment_id=18484464112&status=approved&external_reference=338293&payment_type=credit_card&merchant_order_id=3679245063&preference_id=606140117-2cb872de-a59f-47e2-b42d-bc2e9e278231&site_id=MLC&processing_mode=aggregator&merchant_account_id=null

app.use('/api/devoluciones', router);