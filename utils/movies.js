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

const showMoviesByGenres = (genres, movies) =>{
    let size = genres.length;
    let possibilities = [];
    for(let i=0; i<=size; i++){
        let tempGenres = genres.slice();
        for(let j=0; j<size; j++){
            let temp = tempGenres.slice(j,i);
            if(temp.length>0)
            possibilities.push(temp);
            possibilities.sort((a,b)=>b.length-a.length)
        }
    }
    console.log(possibilities)
    let moviesList = [];
    for(let genre of possibilities){
        for(movie of movies){
          
           
            let movieGenres = movie.genres.sort((a,b)=>a.localeCompare(b));
            // if(JSON.stringify(genre)===JSON.stringify(movie.genres)){
                console.log(JSON.stringify(genre) === JSON.stringify(movieGenres),genre, movieGenres);
            // }
            if(JSON.stringify(genre)===JSON.stringify(movieGenres)){
                moviesList.push(movie);
            }
        }
        
    }
    console.log(moviesList);
    return moviesList;
}

module.exports = {getData, showMoviesByGenres};