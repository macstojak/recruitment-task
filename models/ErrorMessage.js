'use strict'
module.exports = class ErrorMessage{
    constructor(){
        this.message="";
    }

    subscribe(msg){
        this.message+=msg;
    }

    fire(){
        return this.message;
    }
}