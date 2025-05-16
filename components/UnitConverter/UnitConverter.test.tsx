import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnitConverter from './UnitConverter'

describe('UnitConverter', () => {
    it('renders nothing when result is not a valid number', () => {
        const { container } = render(<UnitConverter result="abc" />)
        // Wrapper DIV exists but has no text children
        expect(container.firstChild).toBeEmptyDOMElement()
    })

    it('renders conversions for a positive integer', () => {
        render(<UnitConverter result="10" />)
        expect(screen.getByText('cm = 3.94 in')).toBeInTheDocument()
        expect(screen.getByText('kg = 22.05 lb')).toBeInTheDocument()
        expect(screen.getByText('°C = 50.00 °F')).toBeInTheDocument()
        // Exactly two separators for three items
        expect(screen.getAllByText('|')).toHaveLength(2)
    })

    it('handles decimal input correctly', () => {
        render(<UnitConverter result="0.5" />)
        expect(screen.getByText('cm = 0.20 in')).toBeInTheDocument()
        expect(screen.getByText('kg = 1.10 lb')).toBeInTheDocument()
        expect(screen.getByText('°C = 32.90 °F')).toBeInTheDocument()
    })

    it('handles negative input correctly', () => {
        render(<UnitConverter result="-20" />)
        expect(screen.getByText('cm = -7.87 in')).toBeInTheDocument()
        expect(screen.getByText('kg = -44.09 lb')).toBeInTheDocument()
        expect(screen.getByText('°C = -4.00 °F')).toBeInTheDocument()
    })
})
