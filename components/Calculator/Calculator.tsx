import { useState } from 'react'
import Display from '../Display/Display'
import Keypad from '../Keypad/Keypad'

export default function Calculator() {
    const [expr, setExpr] = useState('')
    const [result, setResult] = useState('')
    const [animate, setAnimate] = useState(false)

    function handleInput(k: string) {
        if (k === 'C') {
            setExpr('')
            setResult('')
            return
        }
        if (k === '+/-') {
            // Start a negative number: append "(-"
            setExpr(prev => prev + '(-')
            return
        }
        if (k === '()') {
            // Toggle parentheses: if more "(" than ")", close one; else open one
            const opens = (expr.match(/\(/g) || []).length
            const closes = (expr.match(/\)/g) || []).length
            setExpr(prev => prev + (opens > closes ? ')' : '('))
            return
        }
        if (k === '%') {
            setExpr(prev => prev + '%')
            return
        }
        if (k === '=') {
            // Auto-close parentheses
            const openCount = (expr.match(/\(/g) || []).length
            const closeCount = (expr.match(/\)/g) || []).length
            let balanced = expr
            if (openCount > closeCount) {
                balanced = expr + ')'.repeat(openCount - closeCount)
            }
            // Before evaluating, convert every "%" into "/100"
            const sanitized = balanced.replace(/%/g, '/100')
            try {
                const res = eval(sanitized)
                setResult(String(res))
            } catch {
                setResult('Error')
            }
            setExpr('')
            setAnimate(true)
            setTimeout(() => setAnimate(false), 150)
            return
        }
        // For digits, ".", or operators + - * /
        setExpr(prev =>
            prev === 'Error'
                ? // after an error, if they type a digit or ".", start fresh
                /^[0-9.]$/.test(k)
                    ? k
                    : ''
                : prev + k
        )
        // reset result when typing more after an evaluation
        if (result) setResult('')
    }

    return (
        <div className="max-w-sm w-full mx-auto mt-20 p-4 bg-[var(--btn-default)] rounded-lg shadow-lg">
            <Display expression={expr} result={result} animate={animate} />
            <Keypad onInput={handleInput} />
        </div>
    )
}
