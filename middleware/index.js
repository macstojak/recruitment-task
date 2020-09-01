const utils = require("../utils/movies");
const middleware = {};
const Validator = require("../models/Validator");



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

middleware.validateBody = async (req, res, next) => {
  const validator = new Validator(req.body);
  const requiredValues = await validator.checkIfRequiredValuesExist();
  // if(requiredValues.result===false){
  //     res.send(`There are missing required values: ${requiredValues.missingValues}`)
  // }
  let inputsResult = validator.checkTheInputs();

  if (inputsResult.result === true && requiredValues.result === true) {
    next();
  } else {
    let message = "";
    if (requiredValues.result === false) {
      message += `\nThere are missing required values:`;
      for (let keys in requiredValues.missingValues) {
        message += `\n# ${requiredValues.missingValues[keys]}`;
      }
    }
    if (inputsResult.result === false) {
      message += `\nThere are some incorrect data types you've passed:`;
      for (let keys in inputsResult.unmatched) {
        if (inputsResult.unmatched) {
          message += `\n # ${inputsResult.unmatched[keys].key} should be of type '${inputsResult.unmatched[keys].properType}' is '${inputsResult.unmatched[keys].invalidType}'`;
        }
      }
    }
    if (inputsResult.longInputs) {
        message+=`\nSome fields are too long:`
        console.log(inputsResult)
        inputsResult.longInputs.forEach(el=>{
            message += `\n# In the field '${el.field}' you've written ${el.number} characters too much.`;
        
        })
        message+=`Try to remove unnecesary data.`
           
       }
    message += `\n Please correct required data and try again later`;
    res.send(message);
  }

};
module.exports = middleware;
