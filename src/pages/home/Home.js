import React from 'react'
import styles from './Home.module.css'

import TransactionForm from './TransactionForm'
import useAuthContext from '../../hooks/useAuthContext'
import useCollection from '../../hooks/useCollection'
import TransactionList from './TransactionList'

const Home = () => {
  const {
    user: { uid },
  } = useAuthContext()
  const { documents, error } = useCollection('transactions', ['uid', '==', uid], ['createdAt', 'desc'])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={uid} />
      </div>
    </div>
  )
}

export default Home
