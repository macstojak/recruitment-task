'use strict'

const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const moviesRoutes = require("./routes/movies");

app.use(express.static(path.join(__dirname, "data")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next){
    res.locals.genres = req.genres;
    next();
 });

app.use("/", moviesRoutes);

app.listen(port, ()=>{
    console.log("The movie server is running on port", port);
})