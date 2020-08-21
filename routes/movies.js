const fs = require("fs");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const utils = require("../utils/movies");


//GET request for genres list
router.get("/:typeOfData?", async (req,res)=>{
    try{
        const data = await utils.getData(req.params.typeOfData);
        res.json(data);
    }catch(e){
        res.status(404).send("Couldn't get the data");
    }
})

//POST request to add movie to database;
router.post("/add", middleware.validateBody, async (req, res)=>{
    // let data = await utils.getData();
    // const id = data.movies[data.movies.length-1].id+1;
    // let movie = req.body;
    // movie.id = id;
    // data.movies.push(movie);
    // try{
    //     fs.writeFile(`${__dirname}/data/db.json`, JSON.stringify(data), "UTF-8", ()=>{
    //         res.send(movie)
    //     })
       
    // }catch(error){
    //     console.log(error);
    // }
  
})

module.exports = router;