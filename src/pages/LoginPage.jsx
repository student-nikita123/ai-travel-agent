import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for field once user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
    setSubmitSuccess(false)
  }

  // Validate form fields
  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Client-side simulation only; no real backend/API call
      setSubmitSuccess(true)
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon-badge" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to manage your AI-curated trips</p>
        </div>

        {/* Client-Side Validation Notice */}
        {submitSuccess && (
          <div className="auth-success-banner" role="status">
            <p>Validation successful! (Simulated authentication)</p>
            <Link
              to="/dashboard"
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                fontWeight: '700',
                color: '#065f46',
                textDecoration: 'underline',
              }}
            >
              Continue to Travel Dashboard &rarr;
            </Link>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <input
                id="login-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <span className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-auth-submit">
            Log In
          </button>
        </form>

        {/* Switch to Register */}
        <div className="auth-switch">
          <span>Don&apos;t have an account?</span>
          <Link to="/register" className="auth-switch-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
