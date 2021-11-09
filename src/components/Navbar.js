import { Link } from 'react-router-dom'

import useLogout from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'
// styles
import styles from './Navbar.module.css'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Xpense tracke₹</li>
        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              hello, <strong>{user.displayName}</strong>
            </li>
            <li>
              <button className='btn' onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
