import { createContext, useEffect, useReducer } from 'react'
import { AUTH_IS_READY, LOGIN, LOGOUT, SIGNUP } from '../constants'
import { projectAuth } from '../firebase/config'

const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, user: action.payload }
    case LOGIN:
      return { ...state, user: action.payload }
    case LOGOUT:
      return { ...state, user: null }
    case AUTH_IS_READY:
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  //"authIsReady" is to verify if we got confirmation from firebase on the user's authentication state that is if it is looged in or not and untill it turns to true no component will render
  const initState = { user: null, authIsReady: false }
  const [state, dispatch] = useReducer(authReducer, initState)
  console.log('AuthContext state :', state)
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: AUTH_IS_READY, payload: user })
      unsub()
    })
  }, [])

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthContext
