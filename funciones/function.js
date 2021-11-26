const knex = require('knex');

class devoluciones {

    constructor(options){
        this.knex = knex(options);
    }


    selectProductos(){

        return this.knex.from("tbl_ventas_devoluciones").select("*").limit(10).offset(1);
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

}

module.exports = { devoluciones }