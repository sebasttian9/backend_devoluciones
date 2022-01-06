const knex = require('knex');

class devoluciones {

    constructor(options){
        this.knex = knex(options);
    }


    // select  Detalle de 

    selectDetallePedidosMercadoLibre(num_venta, producto){

        return this.knex.from("producteca.tbl_pedidos_detalle").select("*").where({num_compra_ml:`${num_venta}`, prod_id:`${producto}`});
        // limit(10).offset(0);
            // .then((row)=>{
            //     return row;
            // }).catch((err) => { console.log(err); throw err})
            // .finally(()=>{
            //     this.knex.destroy();
            // });
    }

    // Productos

    selectProductos(){

        return this.knex.from("tbl_ventas_devoluciones").select("*").limit(10).offset(0);
            // .then((row)=>{
            //     return row;
            // }).catch((err) => { console.log(err); throw err})
            // .finally(()=>{
            //     this.knex.destroy();
            // });
    }

    selectProductosLocal(){

        return this.knex.from("productos").select("*").limit(10).offset(1);
            // .then((row)=>{
            //     return row;
            // }).catch((err) => { console.log(err); throw err})
            // .finally(()=>{
            //     this.knex.destroy();
            // });
    }   
    
    // MOTIVOS DE DEVOLUCION
    
    selectMotivoDevolucion(){

        return this.knex.from("dev_tbl_motivo_devolucion").select("*").where('estado_motivo',1).orderBy('motivo_dev');

    } 



    // CLIENTE
    selectInfoCliente(id){

        return this.knex.from("tbl_clientes").select("*").where('cli_id',id);

    } 



    // FACTURAS 
    selectInfoFactura(factura, rut_cliente){

        return this.knex.from("tbl_ventas_devoluciones").select("*").where({factura:`${factura}`, cliente_rut:`${rut_cliente}`});

    } 


    selectProdEnFactura(codigo,rut){

        
        // const toStringQuery = this.knex.from("tbl_ventas_devoluciones").select("*")
        // .whereRaw('(prod_id like %?% or cod_prov like %?%) and cliente_rut = ?', [`%${codigo}%`,`%${codigo}%`,rut]).toString();
        // console.log(toStringQuery);
        return this.knex.from("tbl_ventas_devoluciones").select("*")
        .whereRaw('(prod_id like ? or cod_prov like ?) and cliente_rut = ?', [`%${codigo}%`,`%${codigo}%`,rut])
        //.where('prod_id','like',`%${codigo}%`).orWhere('cod_prod','like',`%${codigo}%`);
        
    } 

}

module.exports = { devoluciones }