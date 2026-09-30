import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Toggle mobile navigation menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="navbar-container">
      <nav className="navbar" aria-label="Main Navigation">
        {/* Brand Logo & Name */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link" onClick={closeMenu}>
            <span className="brand-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
              </svg>
            </span>
            <span className="brand-name">AI Travel Agent</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a href="/#explore" className="nav-link" onClick={closeMenu}>
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a href="/#features" className="nav-link" onClick={closeMenu}>
                My Trips
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/ai-assistant"
                className={`nav-link ai-link ${location.pathname === '/ai-assistant' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="ai-badge">AI</span>
                AI Assistant
              </Link>
            </li>
          </ul>

          {/* Action Button: Navigate to /login */}
          <div className="nav-actions">
            <Link
              to="/login"
              className={`btn-login ${location.pathname === '/login' ? 'active-login' : ''}`}
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
