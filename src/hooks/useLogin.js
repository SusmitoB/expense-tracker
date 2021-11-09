import { useEffect, useState } from 'react'

import { LOGIN } from '../constants'
import { projectAuth } from '../firebase/config'
import useAuthContext from './useAuthContext'

const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  const login = async (email, password) => {
    setIsPending(true)
    setError(null)
    try {
      //signing in the user
      const response = await projectAuth.signInWithEmailAndPassword(email, password)
      console.log(response.user)
      dispatch({ type: LOGIN, payload: response.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  return { login, error, isPending }
}

export default useLogin
