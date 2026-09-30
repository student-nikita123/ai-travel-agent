import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'
import Footer from '../components/Footer'
import './Chatbot.css'

// Initial AI Welcome Message as required
const INITIAL_AI_MESSAGE = {
  id: 'init-1',
  sender: 'ai',
  text: "Hi! I'm your AI Travel Assistant. I can help you plan trips, discover destinations, create itineraries, and answer travel-related questions.",
  time: 'Just now',
}

// 4 Required Prompt Chips
const SUGGESTED_PROMPTS = [
  'Plan a trip to Goa',
  'Suggest places to visit in India',
  'Create a 5-day itinerary',
  'What should I pack?',
]

function ChatbotPage() {
  const [messages, setMessages] = useState([INITIAL_AI_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll chat area to bottom when new messages arrive or when typing state changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Helper to format current time
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Send a message
  const handleSendMessage = (textToSend) => {
    const trimmed = (textToSend || inputText).trim()
    if (!trimmed || isTyping) return

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: getCurrentTime(),
    }

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking and response delay (900ms)
    setTimeout(() => {
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "I'm currently in demo mode. Real AI assistance will be connected in a later phase.",
        time: getCurrentTime(),
      }
      setMessages((prev) => [...prev, aiReply])
      setIsTyping(false)
    }, 900)
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendMessage()
  }

  // Handle Enter keypress inside input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle suggested prompt chip click
  const handlePromptChipClick = (prompt) => {
    handleSendMessage(prompt)
  }

  // Clear conversation to initial state
  const handleClearChat = () => {
    setMessages([
      {
        ...INITIAL_AI_MESSAGE,
        id: `init-${Date.now()}`,
        time: getCurrentTime(),
      },
    ])
    setIsTyping(false)
  }

  return (
    <div className="chat-layout">
      {/* Top Header */}
      <DashboardNavbar />

      <main className="chat-main-content">
        <div className="chat-container">
          {/* Breadcrumb Navigation */}
          <nav className="chat-breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard" className="chat-breadcrumb-link">
              &larr; Back to Dashboard
            </Link>
            <span className="chat-breadcrumb-divider">/</span>
            <span className="chat-breadcrumb-current">AI Travel Assistant</span>
          </nav>

          {/* Chat Window Card */}
          <div className="chat-card">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-avatar-wrapper">
                  <span className="chat-avatar-icon" aria-hidden="true">🤖</span>
                  <span className="online-indicator" title="Online"></span>
                </div>
                <div className="chat-header-meta">
                  <h1 className="chat-title">AI Travel Assistant</h1>
                  <p className="chat-subtitle">Your intelligent travel companion</p>
                </div>
              </div>

              <div className="chat-header-actions">
                <span className="demo-badge">Demo Mode</span>
                <button
                  type="button"
                  className="btn-clear-chat"
                  onClick={handleClearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Scroll Area */}
            <div className="chat-messages-area" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'row-user' : 'row-ai'}`}>
                  {msg.sender === 'ai' && (
                    <div className="message-avatar" aria-hidden="true">
                      <span>✨</span>
                    </div>
                  )}

                  <div className="message-content-box">
                    <div className={`message-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                      <p className="message-text">{msg.text}</p>
                    </div>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}

              {/* Requirement 7: Typing / Loading Indicator UI */}
              {isTyping && (
                <div className="message-row row-ai typing-row">
                  <div className="message-avatar" aria-hidden="true">
                    <span>✨</span>
                  </div>
                  <div className="message-content-box">
                    <div className="message-bubble bubble-ai typing-bubble" aria-label="AI Assistant is typing">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                    <span className="message-time">Typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Requirement 4: Suggested Prompt Buttons / Chips */}
            <div className="suggested-prompts-bar">
              <span className="prompts-label">Try asking:</span>
              <div className="prompts-list">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="prompt-chip-btn"
                    onClick={() => handlePromptChipClick(prompt)}
                    disabled={isTyping}
                  >
                    <span>💡 {prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Field & Send Button */}
            <form className="chat-input-bar" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about travel destinations, itineraries, packing..."
                className="chat-input-field"
                disabled={isTyping}
                aria-label="Type your message"
              />

              <button
                type="submit"
                className="btn-send-message"
                disabled={!inputText.trim() || isTyping}
                aria-label="Send message"
              >
                <span>Send</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Quick Helpful Links Card Below Chat */}
          <div className="chat-info-footer-card">
            <div className="info-footer-item">
              <span className="info-footer-icon">🗺️</span>
              <div>
                <strong>Need a structured schedule?</strong>
                <p>Use our dedicated <Link to="/trip-planner" className="info-link">Trip Planner</Link> to configure dates, budget, and travel style.</p>
              </div>
            </div>
            <div className="info-footer-item">
              <span className="info-footer-icon">⚡</span>
              <div>
                <strong>Want to explore upcoming bookings?</strong>
                <p>Check your confirmed itineraries in <Link to="/dashboard#my-trips-section" className="info-link">My Trips</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  )
}

export default ChatbotPage
