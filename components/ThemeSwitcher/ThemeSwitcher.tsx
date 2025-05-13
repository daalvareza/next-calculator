import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (theme === 'system') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)')
            setTheme(mq.matches ? 'dark' : 'light')
            const handler = (e: MediaQueryListEvent) => {
                setTheme(e.matches ? 'dark' : 'light')
            }
            mq.addEventListener('change', handler)
            return () => mq.removeEventListener('change', handler)
        }
    }, [theme, setTheme])
    if (!mounted) return null

    return (
        <select
            aria-label="Select theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="px-2 py-1 border rounded bg-[var(--btn-default)]"
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            <option value="system">System</option>
        </select>
    )
}
