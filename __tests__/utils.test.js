const utils = require("../utils/movies");

describe("utils getData()", ()=>{
    it("should be defined", ()=>{
        expect(utils.getData()).toBeDefined();
        expect(utils.getData("movies")).toBeDefined();
        expect(utils.getData("genres")).toBeDefined();
    })
})

describe("utils showMoviesByGenre", ()=>{
    it("should return data", ()=>{
        return utils.getData("movies").then(data=>{
            expect(utils.showMoviesByGenres(["Action", "Drama", "Horror"], data)).not.toBeUndefined(); 
        })
    })
})

describe("utils getCombinations", ()=>{
    it("should return specific number of combinations and be an array", ()=>{
        expect(utils.getCombinations(["Action", "Drama", "Horror"]).length).toBe(7);
    })
})
