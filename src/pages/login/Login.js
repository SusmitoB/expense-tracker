import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import styles from './Login.module.css'

const Login = () => {
  const [creds, setCreds] = useState({ email: '', password: '' })
  const { email, password } = creds
  const { login, isPending, error } = useLogin()
  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input type='email' name='email' onChange={handleChange} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type='password' name='password' onChange={handleChange} value={password} />
      </label>
      {!isPending ? (
        <button className='btn' type='submit'>
          Login
        </button>
      ) : (
        <button className='btn' disabled>
          Logging in user...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login
