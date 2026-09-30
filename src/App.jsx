import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import TripPlannerPage from './pages/TripPlannerPage'
import ChatbotPage from './pages/ChatbotPage'
import Footer from './components/Footer'
import './App.css'

// Helper component to scroll to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const location = useLocation()
  // Pages that render their own dedicated app navigation & integrated layout
  const isAppShell =
    location.pathname === '/dashboard' ||
    location.pathname === '/trip-planner' ||
    location.pathname === '/planner' ||
    location.pathname === '/ai-assistant' ||
    location.pathname === '/assistant'

  return (
    <div className="app-layout">
      <ScrollToTop />

      {/* Standard Landing/Auth Navbar (hidden on app shell views) */}
      {!isAppShell && <Navbar />}

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        <Route path="/planner" element={<TripPlannerPage />} />
        <Route path="/ai-assistant" element={<ChatbotPage />} />
        <Route path="/assistant" element={<ChatbotPage />} />
      </Routes>

      {/* Standard Footer (hidden on app shell views) */}
      {!isAppShell && <Footer />}
    </div>
  )
}

export default App
