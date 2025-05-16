import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import HelpModal from './HelpModal'

describe('HelpModal', () => {
    const onClose = jest.fn()

    beforeEach(() => {
        onClose.mockClear()
    })

    it('renders nothing when open is false', () => {
        render(<HelpModal open={false} onClose={onClose} />)
        expect(screen.queryByText('Keyboard Shortcuts')).toBeNull()
    })

    it('renders the dialog with all list items and Close button when open is true', async () => {
        render(<HelpModal open={true} onClose={onClose} />)

        // The Dialog renders with role="dialog"
        const dialog = await screen.findByRole('dialog')
        expect(dialog).toBeInTheDocument()

        // Title
        expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument()

        // List items
        expect(screen.getByText('0–9 . % ( ) + - * / → buttons')).toBeInTheDocument()
        expect(screen.getByText('Enter →')).toBeInTheDocument()
        expect(screen.getByText(/Backspace \/ Esc → C/)).toBeInTheDocument()
        expect(
            screen.getByText(/“Help” button or “\?” key → this dialog/)
        ).toBeInTheDocument()

        // Close button
        const closeBtn = screen.getByRole('button', { name: /close/i })
        expect(closeBtn).toBeInTheDocument()
    })

    it('calls onClose when Close button is clicked', async () => {
        render(<HelpModal open={true} onClose={onClose} />)
        const closeBtn = await screen.findByRole('button', { name: /close/i })
        await userEvent.click(closeBtn)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when Escape key is pressed', async () => {
        render(<HelpModal open={true} onClose={onClose} />)
        const dialog = await screen.findByRole('dialog')
        fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
