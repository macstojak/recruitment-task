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
        // Iterating through given inputs to see if they meet conditions given: type and/or length.
        for(let key in this.body){
            let value = this.values.filter(el=>el.name===key);
            let inproperObject={};
            // If types don't match then create new response object
            if(value[0].type !== typeof this.body[key]){
               
                inproperObject.key = [key];
                inproperObject.value=this.body[key];
                inproperObject.properType=value[0].type;
                inproperObject.invalidType=typeof this.body[key];   
            }
            if(value[0].length && this.body[key].length>value[0].length){
                inproperObject.invalidLength = this.body[key].length-value[0].length;
            }
            // Checking whether field has length parameter and checking if it meets the range and adding field to response object
           
            Object.keys(inproperObject).length>0?unmatched.push(inproperObject):null;
           
        }
       let result = false;
       unmatched.length > 0 ? result = false : result = true;
       console.log("Inproper obj", unmatched)
       return {result, unmatched}
       
    }
    validateInput(){

    }
}