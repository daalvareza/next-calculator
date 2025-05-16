import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from './Calculator'

describe('Calculator integration with testIds', () => {
    beforeEach(() => {
        jest.useRealTimers()
        render(<Calculator />)
    })

    it('performs 10 + 2 = 12', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByTestId('key-1'))
        await user.click(screen.getByTestId('key-0'))
        await user.click(screen.getByTestId('key-+'))
        await user.click(screen.getByTestId('key-2'))
        await user.click(screen.getByTestId('key-='))

        expect(screen.getByTestId('result')).toHaveTextContent('12')
    })

    it('auto-closes parentheses (3+2)=5', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByTestId('key-()'))
        await user.click(screen.getByTestId('key-3'))
        await user.click(screen.getByTestId('key-+'))
        await user.click(screen.getByTestId('key-2'))
        await user.click(screen.getByTestId('key-='))

        expect(screen.getByTestId('result')).toHaveTextContent('5')
    })

    it('calculates 50% → 0.5', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByTestId('key-5'))
        await user.click(screen.getByTestId('key-0'))
        await user.click(screen.getByTestId('key-%'))
        await user.click(screen.getByTestId('key-='))

        expect(screen.getByTestId('result')).toHaveTextContent('0.5')
    })

    it('clears on C key', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByTestId('key-1'))
        await user.click(screen.getByTestId('key-C'))
        expect(screen.getByTestId('expression')).toHaveTextContent('0')
        expect(screen.getByTestId('result')).toHaveTextContent('0')
    })

    it('toggles sign with the +/- key', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByTestId('key-1'))
        await user.click(screen.getByTestId('key-+/-'))
        expect(screen.getByTestId('expression')).toHaveTextContent('(-1)')
        // Continue calculation: -1 + 2 = 1
        await user.click(screen.getByTestId('key-+'))
        await user.click(screen.getByTestId('key-2'))
        await user.click(screen.getByTestId('key-='))
        expect(screen.getByTestId('result')).toHaveTextContent('1')
    })

    it('shows Error on division by zero and resets on next digit', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByTestId('key-1'))
        await user.click(screen.getByTestId('key-/'))
        await user.click(screen.getByTestId('key-0'))
        await user.click(screen.getByTestId('key-='))
        expect(screen.getByTestId('result')).toHaveTextContent('Error')
        // Now type “5” → should clear the error and start fresh “5”
        await user.click(screen.getByTestId('key-5'))
        expect(screen.getByTestId('expression')).toHaveTextContent('5')
    })

    it('records history, opens panel, selects an entry and closes', async () => {
        const user = userEvent.setup()
        // Do 3*3=9
        await user.click(screen.getByTestId('key-3'))
        await user.click(screen.getByTestId('key-*'))
        await user.click(screen.getByTestId('key-3'))
        await user.click(screen.getByTestId('key-='))
        expect(screen.getByTestId('result')).toHaveTextContent('9')

        // Open history
        await user.click(screen.getByRole('button', { name: /history/i }))
        const item = await screen.findByTestId('history-0')
        expect(item).toHaveTextContent('3*3 = 9')

        // Select it
        await user.click(item)
        // Panel should close
        expect(screen.queryByTestId('history-0')).toBeNull()
        // Expr set to “9”
        expect(screen.getByTestId('expression')).toHaveTextContent('9')
    })

    it('opens HelpModal via the “?” button and closes with its Close button', async () => {
        const user = userEvent.setup()
        // No dialog at start
        expect(screen.queryByText('Keyboard Shortcuts')).toBeNull()
        await user.click(screen.getByRole('button', { name: /help/i }))
        expect(await screen.findByText('Keyboard Shortcuts')).toBeInTheDocument()

        // Close it
        await user.click(screen.getByRole('button', { name: /close/i }))
        expect(screen.queryByText('Keyboard Shortcuts')).toBeNull()
    })

    it('accepts real keyboard events for digits, Enter and C/Escape', () => {
        fireEvent.keyDown(window, { key: '4' })
        fireEvent.keyDown(window, { key: '5' })
        fireEvent.keyDown(window, { key: 'Enter' })
        // Evaluates 45 = 45
        expect(screen.getByTestId('result')).toHaveTextContent('45')
        fireEvent.keyDown(window, { key: 'Escape' })
        // Clear
        expect(screen.getByTestId('expression')).toHaveTextContent('0')
    })
})
