import { useEffect, useState } from 'react'

import { LOGOUT } from '../constants'
import { projectAuth } from '../firebase/config'
import useAuthContext from './useAuthContext'

const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  const logout = async () => {
    setIsPending(true)
    setError(null)
    try {
      //signing out the active user
      await projectAuth.signOut()

      dispatch({ type: LOGOUT })

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

  return { logout, error, isPending }
}

export default useLogout
