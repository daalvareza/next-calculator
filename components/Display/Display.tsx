import React, { useEffect, useRef } from 'react'

interface DisplayProps {
    expression: string
    result: string
    animate: boolean
    transfer: boolean
}

export default function Display({
    expression,
    result,
    animate,
    transfer,
}: DisplayProps) {

    const expressionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (expressionRef.current) {
            // scroll to the rightmost edge
            expressionRef.current.scrollLeft = expressionRef.current.scrollWidth
        }
    }, [expression])

    return (
        <div
            role="status"
            aria-live="polite"
            className="w-full h-20 mb-4 p-4 bg-[var(--screen-bg)] rounded-lg flex flex-col
                        justify-end overflow-hidden min-w-0 max-w-full"
        >
            <div
                ref={expressionRef}
                data-testid="expression"
                className={
                    `text-sm font-mono text-[var(--fg-secondary)] whitespace-nowrap overflow-x-auto hide-scrollbar min-w-0 max-w-full
                    ${transfer ? "move-up" : ""}`
                }
            >
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
