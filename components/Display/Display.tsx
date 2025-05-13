import React from 'react'

interface DisplayProps {
    expression: string
    result: string
    animate: boolean
}

export default function Display({ expression, result, animate }: DisplayProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="w-full h-20 mb-4 p-4 bg-[var(--screen-bg)] rounded-lg flex flex-col justify-end overflow-x-auto"
        >
            <div data-testid="expression" className="text-sm font-mono text-[var(--fg-secondary)]">
                {expression || '0'}
            </div>
            <div
                data-testid="result"
                className={
                    "text-2xl font-mono transition-transform duration-150 " +
                    (animate ? "transform scale-105" : "")
                }
            >
                {result || '0'}
            </div>
        </div>
    )
}
