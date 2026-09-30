import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './DashboardNavbar.css'

function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
    setProfileOpen(false)
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
    setProfileOpen(false)
  }

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev)
  }

  const isPlanner = location.pathname === '/trip-planner' || location.pathname === '/planner'

  return (
    <header className="dash-header-container">
      <nav className="dash-navbar" aria-label="Dashboard Navigation">
        {/* Brand Logo & Name */}
        <div className="dash-brand">
          <Link to="/" className="dash-brand-link" onClick={closeMenu}>
            <span className="dash-brand-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
              </svg>
            </span>
            <span className="dash-brand-name">AI Travel Agent</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="dash-mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={toggleMobileMenu}
        >
          <span className="dash-bar"></span>
          <span className="dash-bar"></span>
          <span className="dash-bar"></span>
        </button>

        {/* Navigation Items (Flights, Hotels, Trip Planner, Explore, My Trips, AI Assistant) */}
        <div className={`dash-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="dash-nav-links">
            <li>
              <Link
                to="/dashboard#search-section"
                className={`dash-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                </svg>
                <span>Flights</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard#search-section"
                className="dash-nav-link"
                onClick={closeMenu}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 22v-6.57a2 2 0 0 1 1.07-1.78l3.93-1.96"/>
                  <path d="M18 22V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18"/>
                  <path d="M18 9h4v13"/>
                </svg>
                <span>Hotels</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trip-planner"
                className={`dash-nav-link ${isPlanner ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Trip Planner</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard#destinations-section"
                className="dash-nav-link"
                onClick={closeMenu}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
                <span>Explore</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard#my-trips-section"
                className="dash-nav-link"
                onClick={closeMenu}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span>My Trips</span>
                <span className="dash-pill-badge">2 Active</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ai-assistant"
                className={`dash-nav-link dash-ai-link ${location.pathname === '/ai-assistant' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="dash-ai-sparkle">✨</span>
                <span>AI Assistant</span>
              </Link>
            </li>
          </ul>

          {/* Profile Area */}
          <div className="dash-profile-container">
            <button
              type="button"
              className="dash-profile-btn"
              onClick={toggleProfile}
              aria-label="User profile menu"
            >
              <div className="dash-avatar">
                <span>AM</span>
              </div>
              <div className="dash-profile-info">
                <span className="dash-user-name">Alex Morgan</span>
                <span className="dash-user-tier">AI Explorer</span>
              </div>
              <svg className={`dash-chevron ${profileOpen ? 'rotate' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="dash-profile-dropdown">
                <div className="dropdown-header">
                  <strong>Alex Morgan</strong>
                  <small>alex.morgan@example.com</small>
                </div>
                <hr className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    closeMenu()
                    navigate('/trip-planner')
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Trip Planner</span>
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    closeMenu()
                    navigate('/dashboard')
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  <span>Travel Dashboard</span>
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    closeMenu()
                    navigate('/')
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                  <span>Landing Page</span>
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    closeMenu()
                    navigate('/login')
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Switch Account / Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default DashboardNavbar
