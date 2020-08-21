module.exports = class Validator{
    constructor(body){
        this.body = body;
        this.missingValues = []
        this.inputValues = [];
        this.values = [
            {name:"genres", required:true, type:"array"}, 
            {name:"title", required:true, type:"string", length: 255},
            {name:"year", required:true, type:"string"},
            {name:"runtime", required:true, type:"number"},
            {name: "director", required:true, type:"string", length:255},
            {name: "actors", required:false, type:"string"},
            {name: "plot", required:false, type: "string"},
            {name: "posterUrl", required:false, type:"string"},
        ];
    }
    getMatchingValues(){
        const keys = Object.keys(this.body);
        return matching = this.checkForMatchedValues(keys);
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
       const matching = this.getMatchingValues(0);
        
    }
    validateInput(){

    }
}