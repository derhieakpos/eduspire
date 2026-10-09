import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './signup.css'

export function Signup () {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    programId: ''
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

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.programId
    ) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            programId: Number(formData.programId)
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed')
        return
      }

      alert('Registration successful! Please login.')

      navigate('/login')

    } catch (error) {
      console.error('Registration error:', error)

      setError(
        'Unable to connect to the server. Please make sure the backend is running.'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='formContainer'>

        <form
          className='formField'
          onSubmit={handleSubmit}
        >

          <h1>Sign Up</h1>

          {error && (
            <p style={{ color: 'red' }}>
              {error}
            </p>
          )}

          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="programId"
            value={formData.programId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Program
            </option>

            <option value="1">
              Frontend Development
            </option>

            <option value="2">
              Backend Development
            </option>

            <option value="3">
              Cloud Engineering
            </option>

            <option value="4">
              Cybersecurity
            </option>

            <option value="5">
              Data Analysis
            </option>

            <option value="6">
              UI/UX Design
            </option>
          </select>

          <button
            type="submit"
            className='submitBtn'
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Submit'}
          </button>

          <p>
            Already have an account?{' '}

            <Link to="/login">
              Login
            </Link>
          </p>

        </form>

      </div>
    </>
  )
}