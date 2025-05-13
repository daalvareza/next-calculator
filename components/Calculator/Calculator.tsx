import { useEffect, useState } from 'react'
import Display from '../Display/Display'
import Keypad from '../Keypad/Keypad'
import UnitConverter from '../UnitConverter/UnitConverter'
import HistoryPanel from '../HistoryPanel/HistoryPanel'
import HelpModal from '../HelpModal/HelpModal'

export default function Calculator() {
    const [expr, setExpr] = useState('')
    const [result, setResult] = useState('')
    const [animate, setAnimate] = useState(false)
    const [justEvaluated, setJustEvaluated] = useState(false)
    const [transfer, setTransfer] = useState(false)
    const [history, setHistory] = useState<{ expr: string; result: string }[]>([])
    const [histOpen, setHistOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)

    function handleInput(k: string) {
        // If we just hit "=", catch the next keypress to transfer the result
        if (justEvaluated && k !== '=') {
            if (result && k !== 'C') {
                // Pop the result up into expr
                setExpr(result)
                setTransfer(true)
                // Clear the animation flag after it finishes
                setTimeout(() => setTransfer(false), 300)
            }
            // Reset states so we process this key normally
            setResult('')
            setJustEvaluated(false)
        }

        // Clear
        if (k === 'C') {
            setExpr('')
            setResult('')
            return
        }

        // Sign toggle
        if (k === '+/-') {
            // If expression ends in a number or ')', wrap that chunk in (- … )
            if (/\d$/.test(expr) || expr.endsWith(')')) {
                // capture last number or parenthesized group
                const updated = expr.replace(/(\d+\.?\d*|\))$/, match =>
                    `(-${match})`
                )
                setExpr(updated)
            } else {
                // otherwise begin a negative number
                setExpr(prev => prev + '(-')
            }
            return
        }

        // Parentheses toggle: if more "(" than ")", close one; else open one
        if (k === '()') {
            const opens = (expr.match(/\(/g) || []).length
            const closes = (expr.match(/\)/g) || []).length
            setExpr(prev => prev + (opens > closes ? ')' : '('))
            return
        }

        // Percent
        if (k === '%') {
            setExpr(prev => prev + '%')
            return
        }

        // Evaluate
        if (k === '=') {
            if (!expr) return
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
                setHistory(h => [{ expr: balanced, result: String(res) }, ...h]);
            } catch {
                setResult('Error')
            }
            setExpr('')
            setAnimate(true)
            setTimeout(() => setAnimate(false), 150)
            setJustEvaluated(true)
            return
        }
        // For digits, ".", or operators + - * /
        setExpr(prev =>
            prev === 'Error'
                ? // After an error, if they type a digit or ".", start fresh
                /^[0-9.]$/.test(k)
                    ? k
                    : ''
                : prev + k
        )
        // reset result when typing more after an evaluation
        if (result) setResult('')
    }

    // Keyboard support
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const k = e.key

            // Allow digits, . % ( ) + - * / 
            if (/^[0-9]$/.test(k) ||
                ['.', '%', '(', ')', '+', '-', '*', '/'].includes(k)
            ) {
                e.preventDefault()
                handleInput(k)
            }
            // Enter → =
            else if (k === 'Enter') {
                e.preventDefault()
                handleInput('=')
            }
            // Backspace or Escape → clear
            else if (k === 'Backspace' || k === 'Escape') {
                e.preventDefault()
                handleInput('C')
            }
            else if (k === 'h' || k === '?') {
                e.preventDefault();
                setHelpOpen(!helpOpen)
            }
        }

        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [expr, result, justEvaluated])

    return (
        <div className="w-sm mx-auto mt-20 p-4 bg-[var(--btn-default)] rounded-lg shadow-lg overflow-x-hidden">
            <Display expression={expr} result={result} animate={animate} transfer={transfer} />
            <UnitConverter result={result} />
            <Keypad onInput={handleInput} />
            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => setHistOpen(!histOpen)}
                    className="mt-4 px-4 py-2 bg-[var(--btn-num)] rounded"
                >
                    History
                </button>
                <button
                    onClick={() => setHelpOpen(true)}
                    aria-label="Help"
                    className="mt-4 w-8 h-8 flex items-center justify-center bg-[var(--btn-num)] rounded-full"
                >
                    ?
                </button>
            </div>
            {histOpen && (
                <HistoryPanel
                    history={history}
                    onSelect={h => { setExpr(h.result); setHistOpen(false); }}
                    open={histOpen}
                    onClose={() => setHistOpen(false)}
                />
            )}
            {helpOpen && <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />}
        </div>
    )
}
