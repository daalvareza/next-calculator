import { render, screen, fireEvent } from '@testing-library/react'
import ThemeSwitcher from './ThemeSwitcher'

const mockSetTheme = jest.fn()

jest.mock('next-themes', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: mockSetTheme,
    }),
}))

describe('ThemeSwitcher', () => {
    beforeEach(() => {
        mockSetTheme.mockClear()
    })

    it('renders a select with the three theme options', async () => {
        render(<ThemeSwitcher />)

        const select = await screen.findByLabelText(/select theme/i)
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue('light')

        const options = screen.getAllByRole('option')
        expect(options).toHaveLength(4)
        expect(options[0]).toHaveValue('light')
        expect(options[0]).toHaveTextContent('Light')
        expect(options[1]).toHaveValue('dark')
        expect(options[1]).toHaveTextContent('Dark')
        expect(options[2]).toHaveValue('blue')
        expect(options[2]).toHaveTextContent('Blue')
        expect(options[3]).toHaveValue('system')
        expect(options[3]).toHaveTextContent('System')
    })

    it('invokes setTheme when a new theme is selected', async () => {
        render(<ThemeSwitcher />)
        const select = await screen.findByLabelText(/select theme/i)

        // simulate changing to “dark”
        fireEvent.change(select, { target: { value: 'dark' } })
        expect(mockSetTheme).toHaveBeenCalledWith('dark')

        // and again to “blue”
        fireEvent.change(select, { target: { value: 'blue' } })
        expect(mockSetTheme).toHaveBeenCalledWith('blue')
    })
})
