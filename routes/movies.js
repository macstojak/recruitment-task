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

//GET request for retrieving random movie with filters
router.get("/find", async (req,res)=>{
    try{
        const data = await utils.getData("movies");
        if(req.query.runtime){
            const maxRuntime=Number.parseInt(req.query.runtime)+10;
            const minRuntime=Number.parseInt(req.query.runtime)-10;
            const genres = req.query.genres?req.query.genres:null;
            if(genres){
                let result = data.filter(el=>el.runtime<=maxRuntime && el.runtime>=minRuntime);
                let genres = JSON.parse(req.query.genres);
                genres.sort((a,b)=>a.localeCompare(b));
                let movies = utils.showMoviesByGenres(genres, result);
               res.send(movies);
              
            }else{
                let result = data.filter(el=>el.runtime<=maxRuntime && el.runtime>=minRuntime);
                res.send(result);
            }
            

            
            
            
        }else{
            let random = Math.floor(Math.random() * data.length)
        }

    }catch(e){
        res.status(404).send("Couldn't find any movie with specified data. Try again later")
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
        fs.writeFile(`${__dirname}/data/db.json`, JSON.stringify(data), "UTF-8", ()=>{
            res.send(movie)
        })
       
    }catch(error){
        console.log(error);
    }
})

module.exports = router;