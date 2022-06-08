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


    // folios por cliente
    selectFolioCliente(id){

            // return this.knex.from("dev_tbl_folio").select("id_folio", "id_num_folio", "Factura_boleta", "Motivo_devolucion", "estado_folio", "Fecha_recepcion", "rut_cliente", "empresa_id").where('rut_cliente',id);
            return this.knex.from("dev_tbl_folio").select("*").leftJoin('dev_tbl_motivo_devolucion', 'dev_tbl_folio.Motivo_devolucion', 'dev_tbl_motivo_devolucion.id_motivo').where('rut_cliente',id);
    
    } 

    // detalle de folios
    selectDetalleFolio(id_folio){

        return this.knex.from("dev_tbl_detalle_devolucion").select("*").where('id_folio',id_folio);

    }     

    // Seleccionar informacion del cliente
    autentificarClienteGabtec(rut,empresa){

        // if(empresa==2){
            console.log(empresa);
            return this.knex.from("tbl_clientes").select("*").where('cli_rut',rut);

        // }elseif(empresa==1){

        //     return this.knex.from("tbl_clientes").select("*").where('cli_rut',rut);
        // }
        

        // switch (empresa) {
        //     case 2:
        //         const toString = this.knex.from("tbl_clientes").select("*").where('cli_rut',rut);
        //         return toString;
        //     case 1:
        //         const toString2 = this.knex.from("automarc_automarco.tbl_clientes").select("*").where('cli_rut',rut);
        //         return toString2;
        // }
        
    }

    autentificarClienteAutomarco(rut,empresa){

        // if(empresa==2){
            console.log(empresa);
            return this.knex.from("automarc_automarco.tbl_clientes").select("*").where('cli_rut',rut);
        
    }

    autentificarClienteAutotec(rut,empresa){

        // if(empresa==2){
            console.log(empresa);
            return this.knex.from("autotec_ecom.tbl_clientes").select("*").where('cli_rut',rut);
        
    }

    autentificarClienteHD(rut,empresa){

        // if(empresa==2){
            console.log(empresa);
            return this.knex.from("autohd_automarcohd.tbl_clientes").select("*").where('cli_rut',rut);
        
    }

    // FACTURAS 
    selectInfoFactura(factura, rut_cliente){

        return this.knex.from("tbl_ventas_devoluciones").select("*").where({factura:`${factura}`, cliente_rut:`${rut_cliente}`});

    } 


        // INSERT CABECERA 
    insertCabecera(objeto){

            return this.knex("dev_tbl_folio").insert({
                                        empresa_id: objeto.empresa, 
                                        Motivo_devolucion: objeto.motivo,  
                                        transporte: objeto.transporte,
                                        Factura_boleta: objeto.factura,
                                        Guia_despacho_factura: objeto.guia,
                                        razon_social: objeto.razonSocial,
                                        rut_cliente	: objeto.rut,
                                        Fecha_recepcion: objeto.fecha_ingreso,
                                        solicitud_cliente:objeto.solicitud,
                                        resumen_motivo_dev: objeto.observacion,
                                        id_num_folio: 999});    
    } 

            // INSERT CABECERA 
    actualizarFolioWeb(id_folio, folio_web){

                const toString = this.knex("dev_tbl_folio").update({id_numero_seguimiento: `${folio_web}`, proceso_wms : 0}).where('id_folio', id_folio);    
                return toString; 
    } 

    actualizarFechaNota(nota_pedido,fecha_factura,id_folio, factura){
        const toString = this.knex("dev_tbl_folio").update({fecha_factura: `${fecha_factura}`,nota_pedido:`${nota_pedido}`, Factura_boleta:`${factura}`  }).where('id_folio', id_folio);    
        return toString; 
    }


            // INSERT CABECERA 
    insertDetalle(objeto){

                // return this.knex("dev_tbl_folio").insert(objeto);    
                const toString = this.knex("dev_tbl_detalle_devolucion").insert(objeto);  
                return toString;  

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