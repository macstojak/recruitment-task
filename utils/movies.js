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

module.exports = {getData};