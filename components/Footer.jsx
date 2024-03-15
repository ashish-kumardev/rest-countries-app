import { useTheme } from '../hooks/useTheme'
import './Footer.css'

export default function Footer() {
  const [isDark] = useTheme()
  return (
    <footer className={`${isDark ? 'dark' : ''}`}>
      <p>Made with 💖 by Ashish Kumar</p>
    </footer>
  )
}
