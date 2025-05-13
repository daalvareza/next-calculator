import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import ThemeSwitcher from '../components/ThemeSwitcher/ThemeSwitcher'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
