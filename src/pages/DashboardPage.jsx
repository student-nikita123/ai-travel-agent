import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'
import Footer from '../components/Footer'
import './Dashboard.css'

// Mock Data for Upcoming Trips
const MOCK_UPCOMING_TRIPS = [
  {
    id: 'TRIP-1024',
    title: 'Tokyo & Kyoto Cultural Odyssey',
    destination: 'Japan',
    dates: 'Nov 12 - Nov 20, 2026',
    duration: '8 Days',
    status: 'Confirmed',
    statusType: 'confirmed',
    flightCode: 'JL 005',
    hotelName: 'Hotel Gracery Shinjuku & Kyoto Ryokan',
    aiStatus: 'AI Itinerary active • 14 activities scheduled',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'TRIP-1025',
    title: 'Swiss Alps Winter Wonderland',
    destination: 'Switzerland (Zurich & Zermatt)',
    dates: 'Dec 24 - Jan 02, 2027',
    duration: '9 Days',
    status: 'Planning',
    statusType: 'planning',
    flightCode: 'LX 017',
    hotelName: 'Matterhorn Alpine Lodge',
    aiStatus: 'AI drafting scenic train routes & ski passes',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80',
  },
]

// Mock Data for Popular Destinations
const MOCK_POPULAR_DESTINATIONS = [
  {
    id: 1,
    name: 'Bali',
    country: 'Indonesia',
    bestTime: 'Apr - Oct',
    price: '$640',
    tag: 'Tropical Haven',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Barcelona',
    country: 'Spain',
    bestTime: 'May - Sep',
    price: '$820',
    tag: 'Art & Architecture',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Dubai',
    country: 'United Arab Emirates',
    bestTime: 'Nov - Mar',
    price: '$750',
    tag: 'Luxury & Skyline',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    name: 'Queenstown',
    country: 'New Zealand',
    bestTime: 'Dec - Feb',
    price: '$980',
    tag: 'Adventure Capital',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=700&q=80',
  },
]

// Mock Data for Trip Planning Ideas
const MOCK_TRIP_IDEAS = [
  {
    id: 'idea-1',
    category: 'Weekend Getaways',
    description: 'Quick 2-3 day escapes with minimal travel time and high relaxation.',
    popularPicks: 'Napa Valley, Savannah, Lake Tahoe',
    icon: '⚡',
  },
  {
    id: 'idea-2',
    category: 'Beach & Island Retreats',
    description: 'Sun-drenched coasts, azure waters, and serene waterfront stays.',
    popularPicks: 'Cancun, Maldives, Phuket',
    icon: '🏖️',
  },
  {
    id: 'idea-3',
    category: 'Cultural & Heritage Tours',
    description: 'Historic landmarks, authentic local cuisine, and museums.',
    popularPicks: 'Rome, Cairo, Istanbul',
    icon: '🏛️',
  },
  {
    id: 'idea-4',
    category: 'Mountain & Adventure Trails',
    description: 'Fresh alpine air, hiking trails, and picturesque mountain valleys.',
    popularPicks: 'Rocky Mountains, Patagonia, Alps',
    icon: '⛰️',
  },
]

// Mock Data for Offers
const MOCK_OFFERS = [
  {
    id: 'offer-1',
    badge: 'Limited Time',
    title: 'AI Smart Saver Flight Deal',
    description: 'Get up to 20% off international flights booked 45+ days in advance.',
    code: 'AITRAVEL20',
  },
  {
    id: 'offer-2',
    badge: 'Hotel Special',
    title: 'Resort Upgrade Bonus',
    description: 'Enjoy free room upgrades and daily complimentary breakfast in Bali & Dubai.',
    code: 'LUXSTAY',
  },
  {
    id: 'offer-3',
    badge: 'Weekend Perk',
    title: 'Instant $60 Trip Credit',
    description: 'Apply on any roundtrip flight + 3-star and above hotel bundle.',
    code: 'WEEKEND60',
  },
]

function DashboardPage() {
  const navigate = useNavigate()

  // Search Form State
  const [activeTab, setActiveTab] = useState('flights') // 'flights' | 'hotels' | 'ai-plan'
  const [searchForm, setSearchForm] = useState({
    from: 'New York (JFK)',
    to: 'Paris (CDG)',
    date: '2026-10-15',
    travellers: '2 Travellers, Economy',
  })

  // Simulated search submit state
  const [searchNotification, setSearchNotification] = useState('')

  // AI Prompt Box State
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  // Handle Search Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Swap From / To locations
  const handleSwapLocations = () => {
    setSearchForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    // If on AI Trip Plan tab, navigate directly to full Trip Planner
    if (activeTab === 'ai-plan') {
      navigate('/trip-planner')
      return
    }

    setSearchNotification(
      `Searching ${activeTab === 'flights' ? 'Flights' : 'Hotels'} from "${searchForm.from}" to "${searchForm.to}" on ${searchForm.date} for ${searchForm.travellers}. (Mock Preview)`
    )
    setTimeout(() => {
      setSearchNotification('')
    }, 6000)
  }

  // Handle sample AI prompt chip click
  const handleSelectPromptChip = (chipText) => {
    setAiPrompt(chipText)
    setAiResponse(
      `AI Assistant response preview for: "${chipText}". In the upcoming integration phase, live LLM travel agents will generate personalized itineraries, budget breakdowns, and local insights.`
    )
  }

  const handleAskAiSubmit = (e) => {
    e.preventDefault()
    if (!aiPrompt.trim()) return
    setAiResponse(
      `AI Assistant response preview for: "${aiPrompt}". In the upcoming integration phase, live LLM travel agents will generate personalized itineraries, budget breakdowns, and local insights.`
    )
  }

  return (
    <div className="dashboard-layout">
      {/* Top Dashboard Header */}
      <DashboardNavbar />

      <main className="dashboard-content">
        {/* SECTION 2: PROMINENT TRAVEL SEARCH / PLANNING SECTION */}
        <section className="dash-search-section" id="search-section">
          <div className="dash-container">
            <div className="search-card">
              {/* Tab Selector: Inspired by modern travel portals */}
              <div className="search-tab-bar" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'flights'}
                  className={`search-tab ${activeTab === 'flights' ? 'active' : ''}`}
                  onClick={() => setActiveTab('flights')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                  </svg>
                  <span>Flights</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'hotels'}
                  className={`search-tab ${activeTab === 'hotels' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hotels')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 22v-6.57a2 2 0 0 1 1.07-1.78l3.93-1.96"/>
                    <path d="M18 22V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18"/>
                    <path d="M18 9h4v13"/>
                  </svg>
                  <span>Hotels</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'ai-plan'}
                  className={`search-tab ${activeTab === 'ai-plan' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ai-plan')}
                >
                  <span className="tab-sparkle">✨</span>
                  <span>AI Trip Plan</span>
                </button>
              </div>

              {/* Form Inputs Grid */}
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <div className="search-inputs-grid">
                  {/* From Field */}
                  <div className="search-field">
                    <label className="field-label" htmlFor="from-input">From</label>
                    <div className="field-input-box">
                      <span className="field-icon" aria-hidden="true">🛫</span>
                      <input
                        id="from-input"
                        name="from"
                        type="text"
                        value={searchForm.from}
                        onChange={handleInputChange}
                        placeholder="Departure City/Airport"
                        className="field-text-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <button
                    type="button"
                    className="btn-swap-locations"
                    onClick={handleSwapLocations}
                    aria-label="Swap departure and destination"
                    title="Swap locations"
                  >
                    ⇄
                  </button>

                  {/* To Field */}
                  <div className="search-field">
                    <label className="field-label" htmlFor="to-input">To</label>
                    <div className="field-input-box">
                      <span className="field-icon" aria-hidden="true">🛬</span>
                      <input
                        id="to-input"
                        name="to"
                        type="text"
                        value={searchForm.to}
                        onChange={handleInputChange}
                        placeholder="Arrival City/Airport"
                        className="field-text-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div className="search-field">
                    <label className="field-label" htmlFor="date-input">Travel Date</label>
                    <div className="field-input-box">
                      <span className="field-icon" aria-hidden="true">📅</span>
                      <input
                        id="date-input"
                        name="date"
                        type="date"
                        value={searchForm.date}
                        onChange={handleInputChange}
                        className="field-text-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Travellers */}
                  <div className="search-field">
                    <label className="field-label" htmlFor="travellers-input">Travellers</label>
                    <div className="field-input-box">
                      <span className="field-icon" aria-hidden="true">👥</span>
                      <input
                        id="travellers-input"
                        name="travellers"
                        type="text"
                        value={searchForm.travellers}
                        onChange={handleInputChange}
                        placeholder="Number of travellers"
                        className="field-text-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="search-action-row">
                  <button type="submit" className="btn-search-plan">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <span>{activeTab === 'ai-plan' ? 'Generate AI Trip Plan' : 'Search Flights & Stays'}</span>
                  </button>
                </div>
              </form>

              {/* Notification Banner */}
              {searchNotification && (
                <div className="search-feedback-banner" role="status">
                  {searchNotification}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 7: OFFERS & RECOMMENDATIONS */}
        <section className="dash-section dash-offers-section">
          <div className="dash-container">
            <div className="section-title-row">
              <div>
                <span className="section-kicker">Exclusive Savings</span>
                <h2 className="dash-heading">Smart Travel Offers</h2>
              </div>
            </div>

            <div className="offers-grid">
              {MOCK_OFFERS.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-top">
                    <span className="offer-badge">{offer.badge}</span>
                    <span className="offer-code-pill">Code: {offer.code}</span>
                  </div>
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-desc">{offer.description}</p>
                  <button type="button" className="btn-offer-apply">
                    Copy Code &amp; Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: MY TRIPS SECTION (Sample Upcoming Trip Cards) */}
        <section className="dash-section" id="my-trips-section">
          <div className="dash-container">
            <div className="section-title-row">
              <div>
                <span className="section-kicker">Your Travel Schedule</span>
                <h2 className="dash-heading">My Upcoming Trips</h2>
              </div>
              <span className="trips-count-badge">2 Active Bookings</span>
            </div>

            <div className="trips-grid">
              {MOCK_UPCOMING_TRIPS.map((trip) => (
                <article key={trip.id} className="trip-card">
                  <div className="trip-image-col">
                    <img src={trip.image} alt={trip.title} className="trip-cover-img" />
                    <span className={`trip-status-pill status-${trip.statusType}`}>
                      {trip.status}
                    </span>
                  </div>

                  <div className="trip-details-col">
                    <div className="trip-header">
                      <span className="trip-id-tag">{trip.id}</span>
                      <h3 className="trip-name">{trip.title}</h3>
                      <p className="trip-location">{trip.destination}</p>
                    </div>

                    <div className="trip-info-pills">
                      <div className="info-pill">
                        <span className="info-icon">📅</span>
                        <span>{trip.dates}</span>
                      </div>
                      <div className="info-pill">
                        <span className="info-icon">✈️</span>
                        <span>{trip.flightCode}</span>
                      </div>
                      <div className="info-pill">
                        <span className="info-icon">🏨</span>
                        <span>{trip.hotelName}</span>
                      </div>
                    </div>

                    <div className="trip-ai-highlight">
                      <span className="ai-status-sparkle">✨</span>
                      <span>{trip.aiStatus}</span>
                    </div>

                    <div className="trip-actions">
                      <button type="button" className="btn-trip-primary">
                        View Detailed Itinerary
                      </button>
                      <button type="button" className="btn-trip-secondary">
                        Manage Trip
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: PLAN YOUR NEXT TRIP */}
        <section className="dash-section dash-plan-next-section">
          <div className="dash-container">
            <div className="section-title-row">
              <div>
                <span className="section-kicker">Inspiration</span>
                <h2 className="dash-heading">Plan Your Next Trip</h2>
                <p className="dash-subheading">
                  Select a travel style or getaway vibe and let our AI assemble the perfect schedule.
                </p>
              </div>
            </div>

            <div className="ideas-grid">
              {MOCK_TRIP_IDEAS.map((idea) => (
                <div key={idea.id} className="idea-card">
                  <div className="idea-icon-badge" aria-hidden="true">
                    {idea.icon}
                  </div>
                  <h3 className="idea-category">{idea.category}</h3>
                  <p className="idea-description">{idea.description}</p>
                  <div className="idea-picks">
                    <strong>Popular:</strong> {idea.popularPicks}
                  </div>
                  <button
                    type="button"
                    className="btn-plan-idea"
                    onClick={() => navigate('/trip-planner')}
                  >
                    <span>Ask AI to Plan</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: EXPLORE POPULAR DESTINATIONS */}
        <section className="dash-section" id="destinations-section">
          <div className="dash-container">
            <div className="section-title-row">
              <div>
                <span className="section-kicker">Global Explorer</span>
                <h2 className="dash-heading">Explore Popular Destinations</h2>
                <p className="dash-subheading">
                  Curated worldwide favorites with live AI recommendation scores and estimated pricing.
                </p>
              </div>
            </div>

            <div className="dash-destinations-grid">
              {MOCK_POPULAR_DESTINATIONS.map((dest) => (
                <div key={dest.id} className="dash-dest-card">
                  <div className="dash-dest-img-box">
                    <img src={dest.image} alt={dest.name} className="dash-dest-img" loading="lazy" />
                    <span className="dash-dest-tag">{dest.tag}</span>
                    <span className="dash-dest-rating">★ {dest.rating}</span>
                  </div>

                  <div className="dash-dest-body">
                    <div className="dash-dest-title-row">
                      <div>
                        <h3 className="dash-dest-name">{dest.name}</h3>
                        <span className="dash-dest-country">{dest.country}</span>
                      </div>
                      <div className="dash-dest-price-box">
                        <span className="price-label">Starts at</span>
                        <span className="price-val">{dest.price}</span>
                      </div>
                    </div>

                    <div className="dash-dest-timing">
                      <span className="timing-label">Best Season:</span>
                      <span className="timing-value">{dest.bestTime}</span>
                    </div>

                    <button
                      type="button"
                      className="btn-explore-dest"
                      onClick={() => navigate('/trip-planner')}
                    >
                      Plan Trip to {dest.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: PROMINENT "ASK AI TRAVEL ASSISTANT" SECTION */}
        <section className="dash-section dash-ai-feature-section" id="ai-assistant-section">
          <div className="dash-container">
            <div className="ai-assistant-card">
              {/* Header */}
              <div className="ai-card-header">
                <div className="ai-badge-header">
                  <span className="ai-sparkle-pill">✨ 24/7 Intelligent Companion</span>
                </div>
                <h2 className="ai-card-title">Ask AI Travel Assistant</h2>
                <p className="ai-card-lead">
                  Your dedicated intelligent travel partner. Ask questions about any part of your journey, anytime.
                </p>
              </div>

              {/* 4 Core AI Pillars */}
              <div className="ai-capabilities-grid">
                <div className="ai-pillar">
                  <div className="pillar-icon">🎯</div>
                  <h4 className="pillar-title">Trip Planning</h4>
                  <p className="pillar-text">
                    Custom personalized multi-day vacation plans built around your budget, travel party, and pace.
                  </p>
                </div>

                <div className="ai-pillar">
                  <div className="pillar-icon">🌟</div>
                  <h4 className="pillar-title">Destination Recommendations</h4>
                  <p className="pillar-text">
                    Discover hidden spots, secret viewpoints, and off-the-beaten-path cultural gems.
                  </p>
                </div>

                <div className="ai-pillar">
                  <div className="pillar-icon">🗺️</div>
                  <h4 className="pillar-title">Itinerary Suggestions</h4>
                  <p className="pillar-text">
                    Optimized daily transit routes, timed reservations, and realistic schedule pacing.
                  </p>
                </div>

                <div className="ai-pillar">
                  <div className="pillar-icon">ℹ️</div>
                  <h4 className="pillar-title">Travel Information</h4>
                  <p className="pillar-text">
                    Up-to-date visa guidelines, seasonal weather alerts, packing tips, and local etiquette.
                  </p>
                </div>
              </div>

              {/* Interactive AI Prompt Playground Simulator */}
              <div className="ai-interaction-box">
                <span className="interaction-heading">Try asking our AI Assistant:</span>

                {/* Sample Prompt Chips */}
                <div className="ai-prompt-chips">
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleSelectPromptChip('Plan a 4-day budget itinerary in Barcelona with walking routes')}
                  >
                    💡 &ldquo;Plan a 4-day budget itinerary in Barcelona&rdquo;
                  </button>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleSelectPromptChip('Best vegetarian ramen & cultural spots in Kyoto')}
                  >
                    🍜 &ldquo;Best vegetarian restaurants in Kyoto&rdquo;
                  </button>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleSelectPromptChip('What are the visa and arrival requirements for Bali in 2026?')}
                  >
                    🛂 &ldquo;Visa requirements for Bali&rdquo;
                  </button>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleSelectPromptChip('Packing essentials for Swiss Alps winter trip')}
                  >
                    ❄️ &ldquo;Packing list for Swiss Alps winter&rdquo;
                  </button>
                </div>

                {/* Interactive Ask Form */}
                <form className="ai-chat-input-row" onSubmit={handleAskAiSubmit}>
                  <div className="ai-input-wrap">
                    <span className="ai-input-icon">💬</span>
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ask anything: 'Recommend a 3-day family weekend near mountains'..."
                      className="ai-text-input"
                    />
                  </div>
                  <button type="submit" className="btn-ai-submit">
                    <span>Ask AI</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>

                {/* AI Simulated Output Display */}
                {aiResponse && (
                  <div className="ai-response-preview" role="status">
                    <div className="response-header">
                      <span className="response-agent-tag">🤖 AI Travel Agent (Simulation)</span>
                    </div>
                    <p className="response-body">{aiResponse}</p>
                  </div>
                )}

                {/* Direct Link to Dedicated Chatbot Interface */}
                <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                  <Link
                    to="/ai-assistant"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#0284c7',
                      textDecoration: 'underline',
                    }}
                  >
                    <span>💬 Open Dedicated AI Travel Assistant Chat Page &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  )
}

export default DashboardPage
