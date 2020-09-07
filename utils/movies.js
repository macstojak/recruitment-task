'use strict'
const fs = require("fs");
const path = require("path");

const getData = (typeOfData) =>{
    return new Promise((resolve, reject)=>{
        const reqPath = path.join(__dirname, "../");
        fs.readFile(`${reqPath}/data/db.json`, "utf-8", (error, result)=>{
            if(error){
                reject("Error fetching data") 
            } else{
                switch(typeOfData){
                    case "movies":
                        resolve(JSON.parse(result).movies);
                        break;
                    case "genres":
                        resolve(JSON.parse(result).genres);
                        break;
                    default:
                        resolve(JSON.parse(result));
                   }
            }
        })
    })
};

const getCombinations = (valuesArray) =>{
    var combinations = [];
    var temp = [];
    var size = Math.pow(2, valuesArray.length);

    for (var i=0; i<size; i++)
    {
        temp = [];
        for (var j=0; j<valuesArray.length; j++)
        {
            if ((i & Math.pow(2, j)))
            {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length>0)
        {
            combinations.push(temp);
        }
    }
    combinations.sort((a, b) => b.length - a.length);
    return combinations;
}

const findMovies = async (genres, movies, runtime) =>{    
        let result;
        if(genres){
            genres.sort((a,b)=>a.localeCompare(b));
            let possibilities = await getCombinations(genres);
            let moviesList = [];
            let temp=[];

            for(let genre of possibilities){
                for(let movie of movies){
                    let movieGenres = movie.genres.sort((a,b)=>a.localeCompare(b));
                    // console.log(movieGenres.some(el=>genre.includes(el)), movieGenres, genre)
                    if(movieGenres.some(el=>genre.includes(el))){
                        moviesList.push(movie);
                    }
                }
            }
           
            //remove duplicates and sort after the best match
            result = [...new Set(moviesList)];
            for(let genre of possibilities){
                for(let movie of moviesList){
                    //find movie which has all the given genres
                    let r = genre.every(el=>movie.genres.includes(el));
                    if(r){
                        temp.push(movie);
                        moviesList.splice([moviesList.findIndex(m=>m.title===movie.title)],1);
                    }
                   
                }
            }
            
            result = [...new Set(temp)];
            result=temp;
        }
        if(runtime){
            const maxRuntime=Number.parseInt(runtime)+10;
            const minRuntime=Number.parseInt(runtime)-10;
            result ? result = result.filter(el=>el.runtime<=maxRuntime && el.runtime>=minRuntime) : result=movies.filter(el=>el.runtime<=maxRuntime && el.runtime>=minRuntime);
        }
        if(!genres && !runtime){
            result=movies[Math.floor(Math.random()*movies.length)];
        }
        return result;
}

module.exports = {getData, findMovies, getCombinations};