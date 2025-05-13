import { render, screen } from '@testing-library/react'
import Keypad from './Keypad'

test('renders C, %, = keys via testId', () => {
    const mock = jest.fn()
    render(<Keypad onInput={mock} />)
    expect(screen.getByTestId('key-C')).toBeInTheDocument()
    expect(screen.getByTestId('key-%')).toBeInTheDocument()
    expect(screen.getByTestId('key-=')).toBeInTheDocument()
})
