const utils = require("../utils/movies");
const movies = utils.getData("movies");
const genres = utils.getCombinations(["Action", "Comedy", "Drama"])
describe("utils getData()", ()=>{
    it("should return data", ()=>{
        //1. Get all data
        expect(utils.getData()).toBeDefined();
        //2. Get only movies
        expect(utils.getData("movies")).toBeDefined();
        //3. Get only genres
        expect(utils.getData("genres")).toBeDefined();
    })
})

describe("utils findMovies()", ()=>{
    it("should return data", ()=>{
        return utils.getData("movies").then(data=>{
            //1. Find movies with all parameters
            expect(utils.findMovies(["Action", "Drama", "Horror"], data, 186)).not.toBeUndefined(); 
            //2. Find movies with specified genres only
            expect(utils.findMovies(["Action", "Drama", "Horror"], data)).not.toBeUndefined();
            //3. Find movies with specified runtime only
            expect(utils.findMovies(null, data, 186)).not.toBeUndefined();
            //4. Find movies with no specified parameters
            expect(utils.findMovies(null, data, null)).not.toBeUndefined();
        })
    })
})

describe("utils getCombinations()", ()=>{
    it("should return specific number of combinations and be an array", ()=>{
        expect(utils.getCombinations(["Action", "Drama", "Horror"]).length).toBe(7);
        expect(Array.isArray(utils.getCombinations(["Action", "Drama", "Horror"]))).toBe(true);
    })
})

describe("utils shallowSearch()", ()=>{
    it("should return all movies containing some of genres", ()=>{
            return utils.getData("movies").then(movies=>{
                expect(utils.shallowSearch(genres, movies)).toBeDefined();
            })
    })
})
