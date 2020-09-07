'use strict'
const fs = require("fs");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const utils = require("../utils/movies");


//GET request for specific data: genres, movies, all data
router.get("/data/:typeOfData?", async (req,res)=>{
    try{
        const data = await utils.getData(req.params.typeOfData);
        res.json(data);
    }catch(e){
        res.status(404).send("Couldn't get the data");
    }
})

//GET request for retrieving movie with filters
router.get("/find", async (req,res)=>{
    try{
        const result = await utils.getData("movies");
        const genres = req.query.genres?JSON.parse(req.query.genres):null;
        const runtime = req.query.runtime?JSON.parse(req.query.runtime):null;
        let movies = await utils.findMovies(genres, result, runtime);
        movies.length>0 ? res.send(movies.map(el=>{return el.title+" - "+el.genres})) : res.send("There are no movies in our database with given runtime or genres")
    }catch(e){
        res.send("Couldn't find any movie with specified data. Change criteria and try again");
    }
})

//POST request to add movie to database with validate middleware;
router.post("/add", middleware.validateBody, async (req, res)=>{
    let data = await utils.getData();
    const id = data.movies[data.movies.length-1].id+1;
    let movie = req.body;
    movie.id = id;
    data.movies.push(movie);
    console.log("Hello",data.movies[data.movies.length-1], movie)
    try{
        fs.writeFile(`${__dirname}/../data/db.json`, JSON.stringify(data), "UTF-8", (response)=>{
            res.send(movie)
        })
    }catch(error){
        console.log(error);
    }
})

module.exports = router;