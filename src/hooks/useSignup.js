import { useEffect, useState } from 'react'
import { LOGIN } from '../constants'
import { projectAuth } from '../firebase/config'
import useAuthContext from './useAuthContext'

const useSignup = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  const signup = async (email, password, displayName) => {
    try {
      setIsPending(true)
      setError(null)

      //creating new user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!response) throw new Error('Could not create the user !')

      //setting the display name for the new user
      await response.user.updateProfile({ displayName })

      //dispatch login after succesful user creation
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

  return { isPending, error, signup }
}

export default useSignup
