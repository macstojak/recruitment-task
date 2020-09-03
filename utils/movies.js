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
                        resolve((JSON.parse(result).movies));
                        break;
                    case "genres":
                        resolve((JSON.parse(result).genres));
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

const showMoviesByGenres = (genres, movies) =>{     
    let possibilities = getCombinations(genres);
    let moviesList = [];
    for(let genre of possibilities){
        for(movie of movies){
            let movieGenres = movie.genres.sort((a,b)=>a.localeCompare(b));
            if(JSON.stringify(genre)===JSON.stringify(movieGenres)){
                moviesList.push(movie);
            }
        }
    }
    return moviesList;
}

module.exports = {getData, showMoviesByGenres, getCombinations};