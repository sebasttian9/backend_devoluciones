// importar
const express = require('express');
const { Router } = require('express');
const { options } = require('./Bdconfig/mysql');
const { devoluciones } = require('./funciones/function');

// inicializar
const app = express();
const cors = require("cors");
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

// configurar cors
// const whitelist = ["http://localhost:3000","chrome-extension://coohjcphdfgbiolnekdpbcijmhambjff/index.html"]
const whitelist = ["*"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors())

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


// buscar detalle de pedido
router.get('/detallePedido/:venta/:prod', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
const venta = req.params.venta;
const prod = req.params.prod;
// console.log('id-->'+rut);
    if(!venta){

        res.send({'error':'venta es requerido'});

    }else{
        conn.selectDetallePedidosMercadoLibre(venta,prod).then((row)=>{

            // console.log(row);
            res.send(row);
        });
    }
})


// buscar folio por rut del cliente
router.get('/foliosCliente/:rut', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    const rut = req.params.rut;
    // console.log('id-->'+rut);
    if(!rut){

        res.send({'error':'venta es requerido'});

    }else{
        conn.selectFolioCliente(rut).then((row)=>{

            // console.log(row);
            res.send(row);
        });
    }
})

// obtener suma de items por factura y nota de pedido
router.get('/sumaItems/:factura/:nota_pedido', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    const factura = req.params.factura;
    const nota_pedido = req.params.nota_pedido;
    // console.log('id-->'+rut);

        conn.selectSumaItemFactura(factura,nota_pedido).then((row)=>{

            // console.log(row);
            res.send(row);
        });
    
})


// buscar detalle folio
router.get('/detalleFolio/:id', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    const id = req.params.id;
    // console.log('id-->'+rut);
    if(!id){

        res.send({'error':'id es requerido'});

    }else{
        conn.selectDetalleFolio(id).then((row)=>{

            // console.log(row);
            res.send(row);
        });
    }
})

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



// Insert Cabecera devolucion
router.post('/save', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    // console.log('id-->'+id);

    const objeto = {
        empresa : req.body.SelectEmpresa,
        motivo: req.body.SelectMotivo,
        transporte: req.body.SelectTransporte,
        factura: req.body.txtFactura,
        guia: req.body.txtGuia,
        razonSocial: req.body.txtRazonSocial,
        rut: req.body.txtRut,
        fecha_ingreso: req.body.txtFecha,
        solicitud: req.body.SelectSolicitud,
        observacion: req.body.txtObservacion

   }

    conn.insertCabecera(objeto).then(resp=>{

            res.json(resp);

    }).catch(error =>{

            res.json({error : 'Error al guardar producto'+error});
    });    
    // if(!id){

    //     res.send({'error':'id es requerido'});

    // }else{
    //     conn.selectProdEnFactura(id,rut).then((row)=>{

    //         res.send(row);
    //     });
    // }

})


// Insert Cabecera devolucion
router.post('/updateSegFolio', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    // console.log('id-->'+id);


        const seguimiento =  req.body.seguimiento;
        const id_folio =  req.body.folio;


    conn.actualizarFolioWeb(id_folio,seguimiento).then(resp=>{

            res.json(resp);

    }).catch(error =>{

            res.json({error : 'Error al actualizar folio'+error});
    });

})

// Insert Cabecera devolucion
router.post('/updateNotaPedido', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    // console.log('id-->'+id);


        const nota_pedido =  req.body.nota_pedido;
        const fecha_factura =  req.body.fecha_factura;
        const id_folio =  req.body.folio;
        const factura =  req.body.factura;


    conn.actualizarFechaNota(nota_pedido,fecha_factura,id_folio, factura).then(resp=>{

            res.json(resp);

    }).catch(error =>{

            res.json({error : 'Error al actualizar folio'+error});
    });

})


// Insert Cabecera devolucion
router.post('/autenticarCliente', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    // console.log('id-->'+id);


        const rut =  req.body.rut_cliente;
        const empresa =  req.body.empresa;

    if(empresa==2){

        conn.autentificarClienteGabtec(rut,empresa).then(resp=>{

            // if(resp.length>0){
                res.json(resp);
            // }else{
            //     res.json({'mensaje':'No existe cliente'});
            // }

        }).catch(error =>{

                res.json({error : 'Error al autenticar cliente'+error});
        });

    }else if(empresa==1){

        conn.autentificarClienteAutomarco(rut,empresa).then(resp=>{

            res.json(resp);

        }).catch(error =>{

                res.json({error : 'Error al autenticar cliente'+error});
        });

    }else if(empresa==3){

        conn.autentificarClienteAutotec(rut,empresa).then(resp=>{

            res.json(resp);

        }).catch(error =>{

                res.json({error : 'Error al autenticar cliente'+error});
        });

    }else if(empresa==4){

        conn.autentificarClienteHD(rut,empresa).then(resp=>{

            res.json(resp);

        }).catch(error =>{

                res.json({error : 'Error al autenticar cliente'+error});
        });

    }



})

// Insert Cabecera devolucion
router.post('/saveDetalle', (req, res)=>{

    // res.send('<h1>Funciona</h1>');
    // console.log('id-->'+id);

    const arrayDetalle = req.body;
    console.log(arrayDetalle);

    // res.send(arrayDetalle);
    // return;

    conn.insertDetalle(arrayDetalle).then(resp=>{

            res.json(resp);

    }).catch(error =>{

            res.json({error : 'Error al guardar producto'+error});
    });    
    // if(!id){

    //     res.send({'error':'id es requerido'});

    // }else{
    //     conn.selectProdEnFactura(id,rut).then((row)=>{

    //         res.send(row);
    //     });
    // }

})


app.use('/api/devoluciones', router);