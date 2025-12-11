import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
      <div className="login-container" style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: '#2a2a2a', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '2rem' }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-32">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-control"
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
            />
          </div>
          <div className="form-group mb-32">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-control"
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
            />
          </div>
          {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="theme-btn"
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#d4a373', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
