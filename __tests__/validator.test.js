const Validator = require("../models/Validator");
const bodyValid = {
    "title": "Pink Panther",
    "year": 1966,
    "runtime": 180,
    "actors": "Peter Sellers",
    "director": "Yaroslav Petrovsky",
    "genres": ["Action", "Comedy"]
}
const bodyInvalid={
    "title": "Pink Panther blalbalbalbaoikaniwodianoidnawoidnaoidnawoidnawoidnawoidjnwaoidjwoaiwopaocnp'doawifoiaenfoiesnfonfoesnfoiesnjfcosnefoiesnefoinofisneofiesnofiesnfoiesnjfoiesnesofinesosifnsoiefnosinfoeseinfoesinfoesinfoesinfsoifnesoinfosinfoesinfosienfoesinfosinefoienofisenefoisneofinseofinseoefinsoeifnos",
    "runtime": "180",
    "actors": "Peter Sellers",
    "director": "Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad Yoamdpaowdmapowdmapodmawo wpdomapwodmawpodmawpdoad "

}
const validatorValid = new Validator(bodyValid);
const validatorInvalid = new Validator(bodyInvalid);

describe("Validator getMatchingValues()",()=>{
    it("should return valid data", ()=>{
        expect(validatorValid.getMatchingValues()).not.toBeUndefined()
    })
})

describe("Validator getRequiredTypes()",()=>{
    it("should return valid data", ()=>{
        expect(validatorValid.getRequiredTypes()).not.toBeUndefined()
    })
})

describe("Validator checkIfRequiredValuesExist()",()=>{
    it("should return true result for valid inputs", ()=>{
        expect(validatorValid.checkIfRequiredValuesExist().result).toBeTruthy();
    })
})

describe("Validator checkIfRequiredValuesExist()",()=>{
    it("should return false result for invalid input - not enough required fields given", ()=>{
        expect(validatorInvalid.checkIfRequiredValuesExist().result).toBeFalsy();
    })
})

describe("getRequiredValues()",()=>{
    it("should return ['director','genres','runtime','title','year']", ()=>{
        expect(validatorValid.getRequiredTypes().sort((a,b)=>a.localeCompare(b))).toStrictEqual(["director","genres","runtime","title","year"])
    })
})

describe("checkForMissingValues()",()=>{
    it("should return ['genres','year'] for validatorInvalid object", ()=>{
        expect(validatorInvalid.checkForMissingValues(Object.keys(validatorInvalid.body))).toStrictEqual(["genres", "year"]);
    })
})
describe("checkTheInputs()", ()=>{
    it("should return result false for validatorInvalid object", ()=>{
        expect(validatorInvalid.checkTheInputs().result).toBeFalsy();
    })
})
describe("checkTheInputs()", ()=>{
    it("should return result true for validatorValid object", ()=>{
        expect(validatorValid.checkTheInputs().result).toBeTruthy();
    })
})