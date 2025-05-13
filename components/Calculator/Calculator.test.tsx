import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from './Calculator'

describe('Calculator integration with testIds', () => {
    beforeEach(() => render(<Calculator />))

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
})
