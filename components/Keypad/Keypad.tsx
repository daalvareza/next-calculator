import Key from '../Key/Key'

const keys = [
    'C', '()', '%', '/',   // row 1
    '7', '8', '9', '*',    // row 2
    '4', '5', '6', '-',    // row 3
    '1', '2', '3', '+',    // row 4
    '+/-', '0', '.', '='   // row 5
]

interface KeypadProps {
    onInput: (k: string) => void
}

export default function Keypad({ onInput }: KeypadProps) {
    return (
        <div className="grid grid-cols-4">
            {keys.map((k, i) =>
                k === '' ? (
                    <div key={i} className="p-4 m-1" />
                ) : (
                    <Key key={k + i} label={k} onClick={onInput} />
                )
            )}
        </div>
    )
}
