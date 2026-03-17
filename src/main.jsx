import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './puzzleswap.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error: error.message + '\n' + error.stack }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', fontSize: 14, background: '#fff', color: '#c00', whiteSpace: 'pre-wrap', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ color: '#c00', marginBottom: 16 }}>⚠️ App Error — please screenshot this</h2>
          {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
