const { it, expect } = require('@jest/globals');
const sub = require('./function1');

it('testing sub function',()=>{
    expect(sub(5,3)).toBe(2);
})


it('testing sub with larger numbers function',()=>{
    expect(sub(3,5)).toBe(-2);
})