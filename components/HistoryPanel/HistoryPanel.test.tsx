import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import HistoryPanel from './HistoryPanel'

describe('HistoryPanel', () => {
    const sampleHistory = [
        { expr: '2+2', result: '4' },
        { expr: '3*3', result: '9' },
    ]
    let onSelect: jest.Mock
    let onClose: jest.Mock

    beforeEach(() => {
        onSelect = jest.fn()
        onClose = jest.fn()
    })

    it('renders nothing when open is false', () => {
        render(
            <HistoryPanel
                history={sampleHistory}
                onSelect={onSelect}
                onClose={onClose}
                open={false}
            />
        )
        expect(screen.queryByText('History')).toBeNull()
    })

    it('shows "No history yet." when history is empty', async () => {
        render(
            <HistoryPanel
                history={[]}
                onSelect={onSelect}
                onClose={onClose}
                open={true}
            />
        )
        expect(await screen.findByText('History')).toBeInTheDocument()
        expect(screen.getByText('No history yet.')).toBeInTheDocument()
    })

    it('renders a button for each history entry', async () => {
        render(
            <HistoryPanel
                history={sampleHistory}
                onSelect={onSelect}
                onClose={onClose}
                open={true}
            />
        )
        expect(await screen.findByRole('dialog')).toBeInTheDocument()
        const items = screen.getAllByRole('button', { name: / = / })
        expect(items).toHaveLength(2)
        expect(items[0]).toHaveTextContent('2+2 = 4')
        expect(items[1]).toHaveTextContent('3*3 = 9')
    })

    it('calls onSelect with the correct entry when one is clicked', async () => {
        render(
            <HistoryPanel
                history={sampleHistory}
                onSelect={onSelect}
                onClose={onClose}
                open={true}
            />
        )
        const second = await screen.findByTestId('history-1')
        await userEvent.click(second)
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith(sampleHistory[1])
    })

    it('calls onClose when the Close button is clicked', async () => {
        render(
            <HistoryPanel
                history={sampleHistory}
                onSelect={onSelect}
                onClose={onClose}
                open={true}
            />
        )
        const closeBtn = await screen.findByRole('button', { name: /close/i })
        await userEvent.click(closeBtn)
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
