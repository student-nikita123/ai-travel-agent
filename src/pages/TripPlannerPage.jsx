import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'
import Footer from '../components/Footer'
import './TripPlanner.css'

// Pre-defined Interest options
const INTEREST_OPTIONS = [
  { id: 'adventure', label: 'Adventure', icon: '🧗‍♂️' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'nature', label: 'Nature', icon: '🌲' },
  { id: 'history', label: 'History', icon: '🏛️' },
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'culture', label: 'Culture', icon: '🎭' },
]

// Travel style options
const TRAVEL_STYLES = [
  {
    id: 'Budget',
    title: 'Budget',
    icon: '🎒',
    description: 'Cost-conscious stays, public transit, and authentic street eats.',
  },
  {
    id: 'Standard',
    title: 'Standard',
    icon: '✨',
    description: 'Balanced comfort, 3–4 star stays, and popular attractions.',
  },
  {
    id: 'Luxury',
    title: 'Luxury',
    icon: '💎',
    description: '5-star resorts, private transfers, and curated fine dining.',
  },
]

function TripPlannerPage() {
  // Form State
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travellers: '2 Travellers',
    budget: '$1,500 - $3,000',
    travelStyle: 'Standard',
    interests: ['Nature', 'Food'],
  })

  // Validation & Submission State
  const [errors, setErrors] = useState({})
  const [submittedPlan, setSubmittedPlan] = useState(null)

  // Handle Text/Select Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Handle Travel Style Selection
  const handleStyleSelect = (styleId) => {
    setFormData((prev) => ({
      ...prev,
      travelStyle: styleId,
    }))
    if (errors.travelStyle) {
      setErrors((prev) => ({
        ...prev,
        travelStyle: '',
      }))
    }
  }

  // Handle Interest Multi-Select Toggle
  const handleInterestToggle = (interestLabel) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interestLabel)
      const updated = exists
        ? prev.interests.filter((item) => item !== interestLabel)
        : [...prev.interests, interestLabel]
      return {
        ...prev,
        interests: updated,
      }
    })

    if (errors.interests) {
      setErrors((prev) => ({
        ...prev,
        interests: '',
      }))
    }
  }

  // Destination Quick Suggestions
  const handleQuickDestination = (destName) => {
    setFormData((prev) => ({
      ...prev,
      destination: destName,
    }))
    if (errors.destination) {
      setErrors((prev) => ({
        ...prev,
        destination: '',
      }))
    }
  }

  // Client-Side Validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.destination.trim()) {
      newErrors.destination = 'Please enter a destination'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Please select a start date'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Please select an end date'
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date cannot be earlier than start date'
    }

    if (!formData.travellers) {
      newErrors.travellers = 'Please specify number of travellers'
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range'
    }

    if (!formData.travelStyle) {
      newErrors.travelStyle = 'Please choose a travel style'
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Store preview simulation
      setSubmittedPlan({ ...formData })
      // Smooth scroll to confirmation
      window.scrollTo({ top: 380, behavior: 'smooth' })
    }
  }

  return (
    <div className="planner-layout">
      {/* Top Header */}
      <DashboardNavbar />

      <main className="planner-main-content">
        <div className="planner-container">
          {/* Breadcrumb Navigation */}
          <nav className="planner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard" className="breadcrumb-link">
              &larr; Back to Dashboard
            </Link>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">AI Trip Planner</span>
          </nav>

          {/* Page Hero Header */}
          <header className="planner-header">
            <div className="planner-badge">
              <span className="badge-sparkle">✨</span>
              <span>Intelligent Itinerary Generator</span>
            </div>
            <h1 className="planner-main-heading">Plan Your Perfect Trip</h1>
            <p className="planner-subheading">
              Customized travel plans built around your style, timeline, and budget.
            </p>
          </header>

          {/* Simulation Output Banner */}
          {submittedPlan && (
            <div className="plan-preview-card" role="status">
              <div className="preview-top">
                <span className="preview-badge">✨ Trip Preferences Captured</span>
                <button
                  type="button"
                  className="btn-dismiss-preview"
                  onClick={() => setSubmittedPlan(null)}
                  aria-label="Dismiss notice"
                >
                  ✕
                </button>
              </div>
              <h2 className="preview-title">
                Ready for AI Itinerary Synthesis: {submittedPlan.destination}
              </h2>
              <div className="preview-details-grid">
                <div><strong>Timeline:</strong> {submittedPlan.startDate} to {submittedPlan.endDate}</div>
                <div><strong>Party:</strong> {submittedPlan.travellers}</div>
                <div><strong>Budget:</strong> {submittedPlan.budget} ({submittedPlan.travelStyle})</div>
                <div><strong>Interests:</strong> {submittedPlan.interests.join(', ')}</div>
              </div>
              <p className="preview-note">
                ⚡ In the upcoming phase, our AI Agent will convert these exact preferences into a live day-by-day itinerary with hotel recommendations, transit routes, and booking links.
              </p>
            </div>
          )}

          {/* Quick AI Assistant Helper Callout */}
          <div className="planner-assistant-callout">
            <div className="callout-left">
              <span className="callout-icon">💬</span>
              <div>
                <strong>Unsure about destinations or have specific questions?</strong>
                <p>Chat live with our AI Travel Assistant for ideas, packing lists, and local tips.</p>
              </div>
            </div>
            <Link to="/ai-assistant" className="btn-callout-chat">
              <span>Ask AI Assistant &rarr;</span>
            </Link>
          </div>

          {/* Main Trip Planning Form */}
          <form className="planner-form-card" onSubmit={handleSubmit} noValidate>
            {/* Step 1: Destination */}
            <section className="form-section">
              <div className="form-section-header">
                <span className="step-num">1</span>
                <div>
                  <h2 className="section-heading">Destination</h2>
                  <p className="section-hint">Where in the world do you want to explore?</p>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="destination-input" className="planner-label">
                  Destination City or Country <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-icon" aria-hidden="true">📍</span>
                  <input
                    id="destination-input"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., Tokyo, Japan or Amalfi Coast, Italy"
                    className={`planner-input ${errors.destination ? 'has-error' : ''}`}
                  />
                </div>
                {errors.destination && (
                  <span className="field-error" role="alert">{errors.destination}</span>
                )}

                {/* Quick destination suggestion chips */}
                <div className="quick-suggestions">
                  <span className="suggestion-label">Popular:</span>
                  {['Kyoto, Japan', 'Santorini, Greece', 'Bali, Indonesia', 'Paris, France', 'Swiss Alps'].map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      className="suggestion-chip"
                      onClick={() => handleQuickDestination(dest)}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Step 2: Dates & Party */}
            <section className="form-section">
              <div className="form-section-header">
                <span className="step-num">2</span>
                <div>
                  <h2 className="section-heading">Dates &amp; Travellers</h2>
                  <p className="section-hint">When are you traveling and with whom?</p>
                </div>
              </div>

              <div className="form-row-grid">
                {/* Start Date */}
                <div className="field-group">
                  <label htmlFor="start-date" className="planner-label">
                    Start Date <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon" aria-hidden="true">📅</span>
                    <input
                      id="start-date"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`planner-input ${errors.startDate ? 'has-error' : ''}`}
                    />
                  </div>
                  {errors.startDate && (
                    <span className="field-error" role="alert">{errors.startDate}</span>
                  )}
                </div>

                {/* End Date */}
                <div className="field-group">
                  <label htmlFor="end-date" className="planner-label">
                    End Date <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon" aria-hidden="true">📅</span>
                    <input
                      id="end-date"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className={`planner-input ${errors.endDate ? 'has-error' : ''}`}
                    />
                  </div>
                  {errors.endDate && (
                    <span className="field-error" role="alert">{errors.endDate}</span>
                  )}
                </div>

                {/* Number of Travellers */}
                <div className="field-group">
                  <label htmlFor="travellers-select" className="planner-label">
                    Number of Travellers <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon" aria-hidden="true">👥</span>
                    <select
                      id="travellers-select"
                      name="travellers"
                      value={formData.travellers}
                      onChange={handleInputChange}
                      className={`planner-select ${errors.travellers ? 'has-error' : ''}`}
                    >
                      <option value="Solo (1 Traveller)">Solo (1 Traveller)</option>
                      <option value="Couple (2 Travellers)">Couple (2 Travellers)</option>
                      <option value="Family (3–4 Travellers)">Family (3–4 Travellers)</option>
                      <option value="Group (5+ Travellers)">Group (5+ Travellers)</option>
                    </select>
                  </div>
                  {errors.travellers && (
                    <span className="field-error" role="alert">{errors.travellers}</span>
                  )}
                </div>
              </div>
            </section>

            {/* Step 3: Budget & Travel Style */}
            <section className="form-section">
              <div className="form-section-header">
                <span className="step-num">3</span>
                <div>
                  <h2 className="section-heading">Budget &amp; Travel Style</h2>
                  <p className="section-hint">Choose how you like to experience your journeys.</p>
                </div>
              </div>

              {/* Budget Range Selector */}
              <div className="field-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="budget-select" className="planner-label">
                  Estimated Total Budget <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-icon" aria-hidden="true">💰</span>
                  <select
                    id="budget-select"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`planner-select ${errors.budget ? 'has-error' : ''}`}
                  >
                    <option value="Under $1,000">Under $1,000 (Economy)</option>
                    <option value="$1,000 - $2,500">$1,000 - $2,500 (Moderate)</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000 (Premium)</option>
                    <option value="$5,000+">$5,000+ (Luxury / Unrestricted)</option>
                  </select>
                </div>
                {errors.budget && (
                  <span className="field-error" role="alert">{errors.budget}</span>
                )}
              </div>

              {/* Travel Style 3-card selection */}
              <div className="field-group">
                <span className="planner-label">
                  Travel Style <span className="req">*</span>
                </span>
                <div className="travel-style-grid">
                  {TRAVEL_STYLES.map((style) => (
                    <div
                      key={style.id}
                      className={`style-card ${formData.travelStyle === style.id ? 'selected' : ''}`}
                      onClick={() => handleStyleSelect(style.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleStyleSelect(style.id)}
                    >
                      <div className="style-card-top">
                        <span className="style-icon">{style.icon}</span>
                        <div className={`style-radio ${formData.travelStyle === style.id ? 'checked' : ''}`}>
                          {formData.travelStyle === style.id && <span className="radio-dot"></span>}
                        </div>
                      </div>
                      <h3 className="style-title">{style.title}</h3>
                      <p className="style-desc">{style.description}</p>
                    </div>
                  ))}
                </div>
                {errors.travelStyle && (
                  <span className="field-error" role="alert">{errors.travelStyle}</span>
                )}
              </div>
            </section>

            {/* Step 4: Interests Multi-Select */}
            <section className="form-section">
              <div className="form-section-header">
                <span className="step-num">4</span>
                <div>
                  <h2 className="section-heading">Interests &amp; Activities</h2>
                  <p className="section-hint">Select what you love doing most when exploring.</p>
                </div>
              </div>

              <div className="field-group">
                <span className="planner-label">
                  Your Interests <span className="req">*</span>
                </span>
                <div className="interests-grid">
                  {INTEREST_OPTIONS.map((item) => {
                    const isSelected = formData.interests.includes(item.label)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`interest-chip ${isSelected ? 'active' : ''}`}
                        onClick={() => handleInterestToggle(item.label)}
                        aria-pressed={isSelected}
                      >
                        <span className="interest-icon">{item.icon}</span>
                        <span className="interest-name">{item.label}</span>
                        {isSelected && <span className="interest-check">✓</span>}
                      </button>
                    )
                  })}
                </div>
                {errors.interests && (
                  <span className="field-error" role="alert">{errors.interests}</span>
                )}
              </div>
            </section>

            {/* Submit Action */}
            <div className="planner-action-bar">
              <button type="submit" className="btn-generate-plan">
                <span className="btn-sparkle">✨</span>
                <span>Generate My Trip Plan</span>
              </button>
              <p className="action-hint">
                No credit card or booking commitment required. Generates a free AI plan preview.
              </p>
            </div>
          </form>

          {/* Requirement 7: Informational Section */}
          <section className="planner-info-card">
            <div className="info-card-header">
              <span className="info-kicker">How It Works</span>
              <h2 className="info-title">How AI Travel Agent Personalizes Your Itinerary</h2>
              <p className="info-subtitle">
                Our AI engine synthesizes real-world travel data with your exact preferences to build an effortless schedule.
              </p>
            </div>

            <div className="info-steps-grid">
              <div className="info-step-item">
                <div className="info-step-icon">🧠</div>
                <h3 className="info-step-title">Preference Analysis</h3>
                <p className="info-step-text">
                  The AI analyzes your chosen pace, travel style, and interests to ensure activities match your expectations.
                </p>
              </div>

              <div className="info-step-item">
                <div className="info-step-icon">🗺️</div>
                <h3 className="info-step-title">Geo-Optimized Route</h3>
                <p className="info-step-text">
                  Attractions and dining spots are grouped logically by neighborhood to minimize transit time and backtracking.
                </p>
              </div>

              <div className="info-step-item">
                <div className="info-step-icon">💰</div>
                <h3 className="info-step-title">Budget Allocation</h3>
                <p className="info-step-text">
                  Smart distribution of hotel, meal, and sightseeing costs so you remain comfortably within your target budget.
                </p>
              </div>

              <div className="info-step-item">
                <div className="info-step-icon">⚡</div>
                <h3 className="info-step-title">Continuous Adaptation</h3>
                <p className="info-step-text">
                  Easily swap activities, add relaxation time, or ask the AI Assistant for instant plan revisions at any time.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  )
}

export default TripPlannerPage
