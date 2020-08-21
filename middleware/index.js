const utils = require("../utils/movies");
const middleware = {};

const checkIfExists = (req, res) =>{
    req.body ? true : res.error("You tried to add empty data. Try again with complete data.") ;
}

/* 
Each movie should contain information about:

- a list of genres (only predefined ones from db file) (required, array of predefined strings)
- title (required, string, max 255 characters)
- year (required, number)
- runtime (required, number)
- director (required, string, max 255 characters)
- actors (optional, string)
- plot (optional, string)
- posterUrl (optional, string)

Each field should be properly validated and meaningful error message should be return in case of invalid value.
 */
const checkForRequiredFields = (body) =>{
    const requiredFields = {"genres": "", "title":"", "year":"", "runtime":"", "director":""};
    return JSON.stringify(Object.keys(requiredFields).sort())===JSON.stringify(Object.keys(body).sort());
}
middleware.validateBody = async (req, res, next) =>{
    checkIfExists(req, res);
    const dataGenres = await utils.getData("genres");
    const {genres, title, year, runtime, director, actors, plot, posterUrl} = req.body;
    res.send(checkForRequiredFields(req.body))
    //  ? next() : new Error("Error occured, you must fill all required fields.")
    


}
module.exports = middleware;