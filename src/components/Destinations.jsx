import './Destinations.css'

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    title: 'Kyoto',
    country: 'Japan',
    category: 'Culture & Nature',
    rating: '4.9',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Ancient shrines, tranquil bamboo forests, and rich culinary heritage.',
    days: '5-7 Days',
  },
  {
    id: 2,
    title: 'Amalfi Coast',
    country: 'Italy',
    category: 'Coastal Romance',
    rating: '4.9',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    description: 'Dramatic pastel cliffs, lemon groves, and stunning Mediterranean vistas.',
    days: '4-6 Days',
  },
  {
    id: 3,
    title: 'Santorini',
    country: 'Greece',
    category: 'Island Escape',
    rating: '4.8',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Whitewashed villages, iconic blue domes, and world-famous caldera sunsets.',
    days: '3-5 Days',
  },
  {
    id: 4,
    title: 'Banff National Park',
    country: 'Canada',
    category: 'Alpine Adventure',
    rating: '4.9',
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    description: 'Turquoise glacial lakes, snow-capped peaks, and untouched wilderness.',
    days: '5-8 Days',
  },
]

function Destinations() {
  return (
    <section className="destinations-section" id="explore">
      <div className="destinations-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Featured Getaways</span>
          <h2 className="section-title">Trending Destinations</h2>
          <p className="section-subtitle">
            Handpicked spots curated by our AI travel algorithms for memorable adventures.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="destinations-grid">
          {FEATURED_DESTINATIONS.map((dest) => (
            <article key={dest.id} className="destination-card">
              <div className="destination-image-wrapper">
                <img
                  src={dest.imageUrl}
                  alt={`${dest.title}, ${dest.country}`}
                  className="destination-image"
                  loading="lazy"
                />
                <span className="category-pill">{dest.category}</span>
                <span className="rating-badge">
                  ★ {dest.rating}
                </span>
              </div>

              <div className="destination-content">
                <div className="destination-location">
                  <h3 className="destination-title">{dest.title}</h3>
                  <span className="destination-country">{dest.country}</span>
                </div>

                <p className="destination-description">{dest.description}</p>

                <div className="destination-footer">
                  <span className="destination-duration">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {dest.days}
                  </span>
                  <button type="button" className="btn-view-trip">
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations
