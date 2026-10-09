import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './login.css'

export function Login () {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      // Save JWT token
      localStorage.setItem('token', data.token)

      // Save student information
      localStorage.setItem(
        'student',
        JSON.stringify(data.student)
      )

      navigate('/dashboard')

    } catch (error) {
      console.error('Login error:', error)

      setError(
        'Unable to connect to the server. Please make sure the backend is running.'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="login-container">

        <div className="intro">

          <h1>Welcome Back!</h1>

          <p>
            Access your academic information, results,
            and assignments all in one place.
          </p>

        </div>

        <div className="sign-up">

          <h2>Login</h2>

          {error && (
            <p style={{ color: 'red' }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="signBtn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

          <p>
            Don't have an account?{' '}

            <Link to="/signup">
              <span>Sign up</span>
            </Link>
          </p>

        </div>

      </div>
    </>
  )
}