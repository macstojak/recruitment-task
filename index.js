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
const getAllData = () =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(`${__dirname}/data/db.json`, "utf-8", (error, result)=>{
            error ? reject("Error fetching data") : resolve((JSON.parse(result)));
        })
    })
}
const getMovies = () =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(`${__dirname}/data/db.json`, "utf-8", (error, result)=>{
            error ? reject("Error fetching data:", error) : resolve((JSON.parse(result)).movies);             
        })   
    })
}

// GET request for movie list
app.get("/",  async (req, res)=>{
    try{
        const data = await getMovies();
        res.json(data);     
    }catch(e){
        res.status(404).send("Error ocurred:"+e);
    }
})

app.post("/add", async (req, res)=>{
    let data = await getAllData();
    const id = data.movies[data.movies.length-1].id+1;
    let movie =req.body;
    movie.id = id;
    data.movies.push(movie);
    try{
        fs.writeFile(`${__dirname}/data/db.json`, JSON.stringify(data), "UTF-8", ()=>{
            res.send(movie)
        })
       
    }catch(error){
        console.log(error);
    }
  
})

app.listen(port, ()=>{
    console.log("The movie server is running on port", port);
})