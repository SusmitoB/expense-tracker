import { useState } from 'react'
import useSignup from '../../hooks/useSignup'

import styles from './Signup.module.css'

const Signup = () => {
  const [creds, setCreds] = useState({ email: '', password: '', displayName: '' })
  const { email, password, displayName } = creds
  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }
  const { isPending, error, signup } = useSignup()

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>signup</h2>
      <label>
        <span>email:</span>
        <input type='email' name='email' onChange={handleChange} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type='password' name='password' onChange={handleChange} value={password} />
      </label>
      <label>
        <span>display name:</span>
        <input type='text' name='displayName' onChange={handleChange} value={displayName} />
      </label>
      {!isPending ? (
        <button className='btn' type='submit'>
          Submit
        </button>
      ) : (
        <button className='btn' disabled>
          Creating user...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
