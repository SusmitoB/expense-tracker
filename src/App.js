import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'

import useAuthContext from './hooks/useAuthContext'

function App() {
  const { authIsReady, user } = useAuthContext()

  // useEffect(() => {
  //   console.log({
  //     apiKey: process.env.REACT_APP_APIKEY,
  //     authDomain: process.env.REACT_APP_AUTHDOMAIN,
  //     projectId: process.env.REACT_APP_PROJECTID,
  //     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  //     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  //     appId: process.env.REACT_APP_APPID,
  //   })
  // })
  return (
    <div className='App'>
      {authIsReady && (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              {!user && <Redirect to='/login' />}
              {user && <Home />}
            </Route>
            <Route path='/login'>
              {user && <Redirect to='/' />}
              {!user && <Login />}
            </Route>
            <Route path='/signup'>
              {/* {user && user.displayName && <Redirect to='/' />} */}
              {user && <Redirect to='/' />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default App
