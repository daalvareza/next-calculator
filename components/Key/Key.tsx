import React, { useRef } from 'react'

interface KeyProps {
    label: string
    onClick: (lbl: string) => void
}

export default function Key({label, onClick }: KeyProps) {
    let bgVar: string
    if (label === 'C') bgVar = 'var(--btn-clear)'
    else if (label === '=') bgVar = 'var(--btn-equal)'
    else if (/^[0-9.]$/.test(label)) bgVar = 'var(--btn-num)'
    else bgVar = 'var(--btn-op)'

    return (
        <button
            data-testid={`key-${label}`}
            onClick={() => onClick(label)}
            aria-label={`Key ${label}`}
            style={{ backgroundColor: bgVar }}
            className="p-4 m-1 rounded-lg flex items-center justify-center text-lg
                 focus:outline-2 focus:outline-offset-1 focus:outline-blue-500"
        >
            {label}
        </button>
    )
}
