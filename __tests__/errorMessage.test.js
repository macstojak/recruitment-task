const ErrorMessage = require("../models/ErrorMessage");
const error = new ErrorMessage();

describe("ErrorMessage class subscribe method", ()=>{
    it("should save the message", ()=>{
            error.subscribe("Example text")
            expect(error.message.length).not.toBe(0);
            expect(error.message).toBe("Example text");
    })
})

describe("ErrorMessage class fire method", ()=>{
    it("should return data", ()=>{
            error.subscribe("Some part of the text");
            expect(error.fire()).not.toBeUndefined();
    })
})