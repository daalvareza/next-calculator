import { render, screen, fireEvent } from '@testing-library/react'
import Key from './Key'

test('calls onClick with its label via testId', () => {
    const handle = jest.fn()
    render(<Key label="7" onClick={handle} />)
    fireEvent.click(screen.getByTestId('key-7'))
    expect(handle).toHaveBeenCalledWith('7')
})
