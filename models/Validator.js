module.exports = class Validator{
    constructor(body){
        this.body = body;
        this.missingValues = []
        this.inputValues = [];
        this.values = [
            {name:"genres", required:true, type:"array"}, 
            {name:"title", required:true, type:"string", length: 255},
            {name:"year", required:true, type:"number"},
            {name:"runtime", required:true, type:"number"},
            {name: "director", required:true, type:"string", length:255},
            {name: "actors", required:false, type:"string"},
            {name: "plot", required:false, type: "string"},
            {name: "posterUrl", required:false, type:"string"},
        ];
    }

    getMatchingValues(){
        const keys = Object.keys(this.body);
        return this.checkForMatchedValues(keys);
    }

    getRequiredTypes(){
        return this.values.filter(el=>el.required===true).map(el=>el.name);
    }

    checkIfRequiredValuesExist(){
        const keys = Object.keys(this.body);
        const result =  JSON.stringify(keys.sort())===JSON.stringify(this.getRequiredTypes().sort());
        const missingValues = this.checkForMissingValues(keys);
        return {result, missingValues};
    }

    checkForMissingValues(keys){
        let required = this.getRequiredTypes();
        let result = required.filter(el=>{
            if(keys.indexOf(el)<0){
                return el;
            }
        })
        return result;
    }

    checkForMatchedValues(keys){
        let required = this.getRequiredTypes();
        let result = required.filter(el=>{
            if(keys.indexOf(el)>-1){
                return el;
            }
        })
        return result;
    }

    checkTheInputs(){
        let unmatched = [];
        let longInputs = [];
        // Iterating through given inputs to see if they meet conditions given: type and/or length.
        for(let key in this.body){
            let value = this.values.filter(el=>el.name===key);
            let inproperTypes={};
            let inproperLength={};
            // If types don't match then create new response object: inproperTypes
            if(value[0].type !== typeof this.body[key]){
                inproperTypes.key = key;
                inproperTypes.value=this.body[key];
                inproperTypes.properType=value[0].type;
                inproperTypes.invalidType=typeof this.body[key];   
            }
              // Checking whether field has length parameter and checking if it meets the range and adding field to response object: inproperLength
              if(value[0].length && this.body[key].length>value[0].length){
                inproperLength.field = key;
                inproperLength.number = this.body[key].length-value[0].length;
            }
            Object.keys(inproperTypes).length>0?unmatched.push(inproperTypes):null;
            Object.keys(inproperLength).length>0?longInputs.push(inproperLength):null;
        }
    
       let result = false;
       unmatched.length > 0 || longInputs>0 ? result = false : result = true;
       return {result, unmatched, longInputs};
    }

}