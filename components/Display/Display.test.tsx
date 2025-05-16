import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Display from './Display'

describe('Display — extra behaviors', () => {
    beforeEach(() => {
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(),
            },
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('defaults expression to "0" when empty', () => {
        render(<Display expression="" result="" animate={false} transfer={false} />)
        expect(screen.getByTestId('expression')).toHaveTextContent('0')
    })

    it('applies the animate class when animate=true', () => {
        render(<Display expression="5" result="6" animate={true} transfer={false} />)
        const resultDiv = screen.getByTestId('result')
        expect(resultDiv).toHaveClass('transform', 'scale-105')
    })

    it('does not apply the animate class when animate=false', () => {
        render(<Display expression="5" result="6" animate={false} transfer={false} />)
        expect(screen.getByTestId('result')).not.toHaveClass('scale-105')
    })

    it('applies the transfer class when transfer=true', () => {
        render(<Display expression="5" result="6" animate={false} transfer={true} />)
        expect(screen.getByTestId('expression')).toHaveClass('move-up')
    })

    it('does not apply the transfer class when transfer=false', () => {
        render(<Display expression="5" result="6" animate={false} transfer={false} />)
        expect(screen.getByTestId('expression')).not.toHaveClass('move-up')
    })

    it('copies the result to clipboard when copy button is clicked', async () => {
        render(<Display expression="1+1" result="2" animate={false} transfer={false} />)
        const btn = screen.getByTestId('copy-button')
        await act(async () => {
            fireEvent.click(btn)
        })
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('2')
    })

    it('scrolls the expression container to its scrollWidth whenever expression changes', () => {
        const { rerender } = render(<Display expression="A" result="1" animate={false} transfer={false} />)
        const exprDiv = screen.getByTestId('expression')

        // Simulate a large scrollWidth
        Object.defineProperty(exprDiv, 'scrollWidth', { value: 314, configurable: true })
        exprDiv.scrollLeft = 0

        // Update the expression prop
        rerender(<Display expression="AB" result="2" animate={false} transfer={false} />)

        expect(exprDiv.scrollLeft).toBe(314)
    })
})
