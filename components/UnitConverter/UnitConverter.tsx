import React from 'react'

const converters = [
    { label: 'cm → in', factor: 0.393701 },
    { label: 'kg → lb', factor: 2.20462 },
    { label: '°C → °F', factor: 9 / 5, offset: 32 },
]

export default function UnitConverter({ result }: { result: string }) {
    const num = parseFloat(result)
    const hasResult = !isNaN(num)

    return (
        <div
            className="my-2 min-h-[1.25rem] flex flex-wrap justify-center items-center 
                    gap-x-2 gap-y-1 text-sm text-[var(--fg-secondary)]"
        >
            {hasResult &&
                converters.map((c, i) => {
                    const val =
                        c.offset != null
                            ? (num * c.factor + c.offset).toFixed(2)
                            : (num * c.factor).toFixed(2)

                    const [from, , to] = c.label.split(' ')

                    return (
                        <React.Fragment key={c.label}>
                            <span>
                                {from} = {val} {to}
                            </span>
                            {i < converters.length - 1 && (
                                <span className="px-2 select-none">|</span>
                            )}
                        </React.Fragment>
                    )
                })}
        </div>
    )
}
