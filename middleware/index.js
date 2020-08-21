const utils = require("../utils/movies");
const middleware = {};
const Validator = require("../models/Validator");

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


middleware.validateBody = async (req, res, next) =>{
    const validator = new Validator(req.body);
    const requiredValues = await validator.checkIfRequiredValuesExist();
    // if(requiredValues.result===false){
    //     res.send(`There are missing required values: ${requiredValues.missingValues}`)
    // }
    let inputsResult = validator.checkTheInputs();
    if(inputsResult.result === false){

    }
    if(inputsResult.result===true && requiredValues.result===true){
        next();
    }else{
        res.send(`There are some problems that occured, please check the following issues:
        <br/>
        There are missing required values: ${requiredValues.missingValues}.
        <br/>
        Some fields are incorrect: <ul>${inputsResult.wrongValues}</ul>
        `)
    }
    // const result = await validator.checkTheFields(req.body);
    //    if(result===true){
    //        next();
    //    }else{
    //        console.log(result);
    //    }
   
    
    
}
module.exports = middleware;