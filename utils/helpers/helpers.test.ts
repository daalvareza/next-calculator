import { evaluateExpression, stripLeadingZeros } from "./helpers"

describe('evaluateExpression', () => {
    it('adds two numbers', () => {
        expect(evaluateExpression('2+3')).toBe(5)
    })

    it('respects operator precedence', () => {
        // multiplication before addition
        expect(evaluateExpression('2+3*4')).toBe(14)
        // subtraction and division mix
        expect(evaluateExpression('10-8/4')).toBe(8)
    })

    it('handles parentheses', () => {
        expect(evaluateExpression('(2+3)*4')).toBe(20)
        expect(evaluateExpression('2*(3+4)/7')).toBe(2)
    })

    it('supports multiple-digit and decimal numbers', () => {
        expect(evaluateExpression('12+34')).toBe(46)
        expect(evaluateExpression('5.5*2')).toBe(11)
        expect(evaluateExpression('100.0/4')).toBe(25)
    })

    it('handles complex expressions', () => {
        expect(evaluateExpression('3+4*2/(1-5)')).toBe(1)
        expect(evaluateExpression('3+4*2/(1-5)+6')).toBe(7)
    })

    it('throws on empty or invalid input', () => {
        expect(() => evaluateExpression('')).toThrow('Invalid expression')
        expect(() => evaluateExpression('abc')).toThrow('Invalid expression')
        expect(() => evaluateExpression('2++2')).toThrow()
    })
})

describe('stripLeadingZeros', () => {
    it('reduces all-zero strings to "0"', () => {
        expect(stripLeadingZeros('0')).toBe('0')
        expect(stripLeadingZeros('00')).toBe('0')
        expect(stripLeadingZeros('0000')).toBe('0')
    })

    it('strips leading zeros before a non-zero digit', () => {
        expect(stripLeadingZeros('000123')).toBe('123')
        expect(stripLeadingZeros('00100')).toBe('100')
        expect(stripLeadingZeros('000001')).toBe('1')
    })

    it('handles decimals correctly', () => {
        expect(stripLeadingZeros('000.5')).toBe('0.5')
        expect(stripLeadingZeros('00.05')).toBe('0.05')
        expect(stripLeadingZeros('0.123')).toBe('0.123')
    })

    it('works inside expressions', () => {
        expect(stripLeadingZeros('05+03')).toBe('5+3')
        expect(stripLeadingZeros('(0004*02)')).toBe('(4*2)')
        expect(stripLeadingZeros('-0012.3')).toBe('-12.3')
    })

    it('does nothing if there are no leading zeros', () => {
        expect(stripLeadingZeros('123')).toBe('123')
        expect(stripLeadingZeros('10')).toBe('10')
        expect(stripLeadingZeros('0.5')).toBe('0.5')
    })
})
