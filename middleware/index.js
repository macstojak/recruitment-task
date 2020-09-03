const utils = require("../utils/movies");
const middleware = {};
const Validator = require("../models/Validator");
const ErrorMessage = require("../models/ErrorMessage");

const checkTheErrors = (requiredValues, inputsResult, error) =>{
  if (requiredValues.result === false) {
    error.subscribe(`\nThere are missing required values:`);
    for (let keys in requiredValues.missingValues) {
     error.subscribe(`\n# ${requiredValues.missingValues[keys]}`);
    }
  }
  if (inputsResult.result === false) {
   error.subscribe(`\nThere are some incorrect data types you've passed:`);
    for (let keys in inputsResult.unmatched) {
      if (inputsResult.unmatched) {
        error.subscribe(`\n # ${inputsResult.unmatched[keys].key} should be of type '${inputsResult.unmatched[keys].properType}' is '${inputsResult.unmatched[keys].invalidType}'`);
      }
    }
  }
  if (inputsResult.longInputs) {
      error.subscribe(`\nSome fields are too long:`);
      inputsResult.longInputs.forEach(el=>{
         error.subscribe(`\n# In the field '${el.field}' you've written ${el.number} characters too much.`);
      
      })
      error.subscribe(`Try to remove unnecesary data.`)
         
     }
     error.subscribe(`\n Please correct required data and try again later`);
     console.log(error.fire())
     
}

middleware.validateBody = async (req, res, next) => {
  const validator = new Validator(req.body);
  const error = new ErrorMessage();
  const requiredValues = await validator.checkIfRequiredValuesExist();
  const inputsResult = validator.checkTheInputs();
  
  if(inputsResult.result === true && requiredValues.result === true) {
    next();
  }else{
    checkTheErrors(requiredValues, inputsResult, error);
    res.send(error.fire());
  }
};
module.exports = middleware;
