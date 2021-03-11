const assert = require('assert');

describe("Set of functions", () => {
    describe("Singel test", () => {
        const s = "hello es6 mocha";
        const parts =  s.split(" ");
        it("Should have three parts", ()=>{
            assert.equal(parts.length, 3);
        });
    });
});
