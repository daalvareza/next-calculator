/**
 * Evaluate a numeric expression containing +, -, *, /, and parentheses.
 * Uses the Shunting-Yard algorithm to convert infix to Reverse Polish Notation (RPN),
 * then evaluates the RPN expression.
 * Handle operator precedence and parentheses efficiently (O(n) time) without eval().
 */
export function evaluateExpression(input: string): number {
    // Tokenize the input string into numbers, operators, and parentheses
    const tokenList = input.match(/\d+(?:\.\d+)?|[()+\-*/]/g)
    if (!tokenList) {
        throw new Error("Invalid expression: no tokens found.")
    }

    // Define operator precedence
    const operatorPrecedence: Record<string, number> = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }

    // Initialize the output queue (for RPN) and operator stack
    const rpnQueue: string[] = []
    const operatorStack: string[] = []
    let previousToken: string | null = null

    // Shunting-Yard: convert infix tokens to RPN queue
    for (const token of tokenList) {
        // Unary minus
        if (
            token === '-' &&
            (previousToken === null || previousToken === '(' || previousToken in operatorPrecedence)
        ) {
            // Emit a 0, then treat “–” as a normal operator
            rpnQueue.push('0')
            operatorStack.push('-')
            previousToken = token
            continue
        }

        // Reject consecutive operators
        if (
            previousToken !== null &&
            previousToken in operatorPrecedence &&
            token in operatorPrecedence
        ) {
            throw new Error("Invalid expression: consecutive operators.")
        }

        if (!isNaN(+token)) {
            // If token is a number, push straight to the output queue
            rpnQueue.push(token)

        } else if (token in operatorPrecedence) {
            // If token is an operator, pop operators with higher or equal precedence
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] !== '(' &&
                operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]
            ) {
                rpnQueue.push(operatorStack.pop()!)
            }
            operatorStack.push(token)

        } else if (token === '(') {
            // Left parenthesis always goes on the operator stack
            operatorStack.push(token)

        } else if (token === ')') {
            // On right parenthesis, pop until matching '('
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] !== '('
            ) {
                rpnQueue.push(operatorStack.pop()!)
            }
            // Discard the '('
            operatorStack.pop()
        }
        previousToken = token
    }

    // After reading all tokens, drain any remaining operators to the queue
    while (operatorStack.length > 0) {
        rpnQueue.push(operatorStack.pop()!)
    }
    const cleaned = rpnQueue.filter(tok => tok !== "(" && tok !== ")")

    // Evaluate the RPN expression
    const evaluationStack: number[] = []
    for (const token of cleaned) {
        if (!isNaN(+token)) {
            // Push numbers onto the stack
            evaluationStack.push(+token)
        } else {
            // Pop two operands for the operator
            const right = evaluationStack.pop()!
            const left = evaluationStack.pop()!
            let computed: number
            switch (token) {
                case '+':
                    computed = left + right
                    break
                case '-':
                    computed = left - right
                    break
                case '*':
                    computed = left * right
                    break
                case '/':
                    if (right === 0) throw new Error("Division by zero")
                    computed = left / right
                    break
                default:
                    throw new Error(`Unknown operator: ${token}`)
            }
            // Push the result back onto the stack
            evaluationStack.push(computed)
        }
    }

    // The final result should be the only item on the stack
    if (evaluationStack.length !== 1) {
        throw new Error("Invalid expression: could not evaluate to a single result.")
    }
    return evaluationStack[0]
}

export function stripLeadingZeros(expr: string): string {
    return expr.replace(/-?\d+(\.\d+)?/g, (match) => {
        let sign = ""
        let num = match

        // Pull off leading "-" if present
        if (num[0] === "-") {
            sign = "-"
            num = num.slice(1)
        }

        if (num.includes(".")) {
            // Decimal: split integer vs fraction
            const [intPart, fracPart] = num.split(".", 2)
            // Strip leading zeros, but leave a single "0" if it becomes empty
            let cleanInt = intPart.replace(/^0+/, "") || "0"
            return sign + cleanInt + "." + fracPart
        } else {
            // Pure integer: strip all leading zeros, fallback to "0"
            let cleanInt = num.replace(/^0+/, "") || "0"
            return sign + cleanInt
        }
    })
}
