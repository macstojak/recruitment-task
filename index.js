'use strict'

const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");
const db = require("./data/db.json");

const getData = () =>{
   fs.readFile("./data/db.json", (error, result)=>{
        if(error){
            console.log("Error fetching data:", error)
         }else{
            return JSON.parse(result);
         } 
    })   
}

app.get("/",  async ()=>{
    try{
        const data = await getData();
        console.log("Here's your data:",data);
    }catch(e){
        console.log("Error ocurred:",e);
    }
})

app.listen(port, ()=>{
    console.log("The movie server is running on port", port);
})