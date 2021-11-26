const knex = require('knex');

class devoluciones {

    constructor(options){
        this.knex = knex(options);
    }

}