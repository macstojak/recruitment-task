'use strict'

const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "data")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const getMovies = () =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(`${__dirname}/data/db.json`, "utf-8", (error, result)=>{
            error ? reject("Error fetching data:", error) : resolve((JSON.parse(result)).movies);             
        })   
    })
}

app.get("/",  async (req, res)=>{
    try{
        const data = await getMovies();
        res.send(data);     
    }catch(e){
        res.status(404).send("Error ocurred:"+e);
    }
})

app.post("/add", async (req, res)=>{
    const data = await getMovies();
    const id = data[data.length-1].id+1;
    let movie =req.body;
    movie.id = id;
    data.push(movie);
    try{
        fs.writeFile(`${__dirname}/data/db.json`, JSON.stringify(data), "UTF-8", ()=>{})
       
    }catch(error){
        console.log(error);
    }
  
})

app.listen(port, ()=>{
    console.log("The movie server is running on port", port);
})