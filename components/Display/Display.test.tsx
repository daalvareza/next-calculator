import { render, screen } from '@testing-library/react'
import Display from './Display'

describe('Display', () => {
    it('shows expression and result', () => {
        render(<Display expression="1+2" result="3" animate={false} />)
        expect(screen.getByTestId('expression')).toHaveTextContent('1+2')
        expect(screen.getByTestId('result')).toHaveTextContent('3')
    })

    it('defaults to 0 when empty', () => {
        render(<Display expression="" result="" animate={false} />)
        expect(screen.getByTestId('result')).toHaveTextContent('0')
    })
})
