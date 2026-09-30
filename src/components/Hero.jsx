import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Travel AI Pill Badge */}
        <div className="hero-badge">
          <span className="sparkle-icon" aria-hidden="true">✨</span>
          <span>Next-Generation Intelligent Travel</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          Your <span className="gradient-text">AI-Powered</span> Travel Companion
        </h1>

        {/* Supporting Text */}
        <p className="hero-description">
          Plan trips, discover destinations, and get personalized travel assistance with AI.
        </p>

        {/* Action Buttons: Navigate to Travel Dashboard */}
        <div className="hero-cta-group">
          <Link to="/dashboard" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
            <span>Plan My Trip</span>
          </Link>

          <Link to="/dashboard#ai-assistant-section" className="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Ask AI Assistant</span>
          </Link>
        </div>

        {/* Travel Highlights Metric Strip */}
        <div className="hero-highlights">
          <div className="highlight-item">
            <span className="highlight-number">100+</span>
            <span className="highlight-label">Curated Destinations</span>
          </div>
          <div className="highlight-divider" aria-hidden="true"></div>
          <div className="highlight-item">
            <span className="highlight-number">Instant</span>
            <span className="highlight-label">Smart Itineraries</span>
          </div>
          <div className="highlight-divider" aria-hidden="true"></div>
          <div className="highlight-item">
            <span className="highlight-number">24/7</span>
            <span className="highlight-label">Travel Guidance</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
