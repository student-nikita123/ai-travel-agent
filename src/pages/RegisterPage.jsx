import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join AI Travel Agent to start intelligent planning</p>
        </div>

        {/* Client-Side Validation Notice */}
        {submitSuccess && (
          <div className="auth-success-banner" role="status">
            <p>Account validation passed! (Simulated registration)</p>
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
              Enter Travel Dashboard &rarr;
            </Link>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                id="reg-name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                autoComplete="name"
              />
            </div>
            {errors.fullName && (
              <span className="error-message" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                id="reg-email"
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
            <label htmlFor="reg-password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <input
                id="reg-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                autoComplete="new-password"
              />
            </div>
            {errors.password && (
              <span className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="reg-confirm-password" className="form-label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <input
                id="reg-confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message" role="alert">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-auth-submit">
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <div className="auth-switch">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-switch-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
