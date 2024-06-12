import { expect, test } from 'vitest'
import { isValidEquation } from './Form'

test('accepts correct symbols', ()=> {
    expect (isValidEquation("1+2+3")).toBe(true)
})

test('accepts times symbol', ()=> {
    expect (isValidEquation("1*4")).toBe(true)
})
test('accepts blanks with symbols', ()=> {
    expect (isValidEquation("1 - 4 ")).toBe(true)
})