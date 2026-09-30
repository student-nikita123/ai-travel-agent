import './Features.css'

const FEATURES_DATA = [
  {
    id: 1,
    title: 'Smart Trip Planning',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
      </svg>
    ),
    description:
      'Generate optimized day-by-day travel itineraries customized to your dates, pace, and preferred travel style.',
    badge: 'Automated & Fast',
  },
  {
    id: 2,
    title: 'Personalized Recommendations',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    description:
      'Receive tailored suggestions for hotels, dining, and hidden gem attractions matched to your budget and interests.',
    badge: 'Tailored for You',
  },
  {
    id: 3,
    title: 'AI Travel Assistant',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
    ),
    description:
      'Ask questions 24/7 about local guidelines, transit routes, packing checklists, and real-time travel advice.',
    badge: '24/7 Intelligence',
  },
]

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <span className="features-badge">Intelligent Features</span>
          <h2 className="features-title">Why Travel with AI?</h2>
          <p className="features-subtitle">
            Experience seamless vacation planning powered by modern artificial intelligence.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="features-grid">
          {FEATURES_DATA.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <span className="feature-tag">{feature.badge}</span>
              </div>
              <h3 className="feature-name">{feature.title}</h3>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
