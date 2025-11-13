import { useState, useEffect } from 'react'
import { track } from '@vercel/analytics'

function App() {
  const [emailCopied, setEmailCopied] = useState(false)
  const serviceEmail = 'zd110jifeng@gmail.com'
  
  // 添加页面加载事件跟踪
  useEffect(() => {
    // 页面加载时发送事件
    try {
      track('page_viewed', {
        page: 'home',
        timestamp: new Date().toISOString()
      })
      console.log('Vercel Analytics: Page view event sent')
    } catch (error) {
      console.error('Failed to send page view event:', error)
    }
  }, [])
  const copyToClipboard = () => {
    navigator.clipboard.writeText(serviceEmail)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
    
    // 记录复制邮箱事件到Vercel Analytics，添加错误处理
    try {
      track('email_copied', {
        email: serviceEmail,
        timestamp: new Date().toISOString()
      })
      console.log('Vercel Analytics: Email copied event sent')
    } catch (error) {
      console.error('Failed to send email copied event:', error)
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>ReviewInsight</h1>
        <p>Amazon Review Analysis Tool</p>
      </header>
      
      <main className="main">
        <section className="hero">
          <h2>Get Insights from Your Amazon Reviews</h2>
          <p>Our AI-powered analysis helps you understand customer feedback, identify issues, and improve your products.</p>
        </section>

        <section className="email-instruction">
          <div className="instruction-content">
            <h3>How It Works</h3>
            <ol>
              <li>Copy our service email address below</li>
              <li>Send an email with your Amazon product URL</li>
              <li>Our AI will analyze all reviews for your product</li>
              <li>You'll receive a comprehensive analysis report directly to your email</li>
            </ol>
          </div>

          <div className="email-container">
            <div className="email-box">
              <div className="email-icon">✉️</div>
              <div className="email-info">
                <p className="email-label">Service Email</p>
                <div className="email-address-container">
                  <span className="email-address">{serviceEmail}</span>
                  <button 
                    className="copy-button" 
                    onClick={copyToClipboard}
                    aria-label="Copy email address"
                  >
                    {emailCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="email-note">
                  Send your Amazon product URL to this address and receive a detailed analysis report.
                </p>
              </div>
            </div>
          </div>

          <div className="benefits">
            <h3>What You'll Get</h3>
            <div className="benefit-cards">
              <div className="benefit-card">
                <div className="benefit-icon">🔍</div>
                <h4>Issue Identification</h4>
                <p>Automatically categorize problems mentioned in negative reviews</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h4>Severity Analysis</h4>
                <p>Determine which issues are most critical to address</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💡</div>
                <h4>Actionable Insights</h4>
                <p>Receive specific recommendations for product improvements</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 ReviewInsight. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App