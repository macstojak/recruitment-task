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
        res.send("Couldn't get the data"+ e);
    }
})

//GET request for retrieving movie with filters
router.get("/find", async (req,res)=>{
    try{
        const result = await utils.getData("movies");
        const genres = req.query.genres?JSON.parse(req.query.genres):false;
        const runtime = req.query.runtime?JSON.parse(req.query.runtime):false;
        let movies = await utils.findMovies(genres, result, runtime);
        movies.length>0 ? res.send(movies.map((el, index)=>`${index+1}. ${el.title}; genres: ${el.genres}; runtime: ${el.runtime}`)) : res.send(`Random movie:\n${movies.title}\ngenres: ${movies.genres}\nruntime: ${movies.runtime}`);
    }catch(e){
        res.send("Couldn't find any movie with specified data. Change criteria and try again"+e);
    }
})

//POST request to add movie to database with validate middleware;
router.post("/add", middleware.validateBody, async (req, res)=>{
    let data = await utils.getData();
    const id = data.movies[data.movies.length-1].id+1;
    let movie = req.body;
    movie.id = id;
    data.movies.push(movie);

    try{
        fs.writeFile(`${__dirname}/../data/db.json`, JSON.stringify(data), "UTF-8", ()=>{
            res.send("Movie added");
        })
    }catch(error){
        res.send("Can't add movie. Error occured:" + error)
    }
})

module.exports = router;