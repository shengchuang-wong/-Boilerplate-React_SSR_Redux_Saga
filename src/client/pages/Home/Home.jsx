import React from 'react'
import { Link } from 'react-router-dom'
import SEO from 'client/components/common/SEO/SEO'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <div>
      <SEO title="Home page" description="Home page description" />
      <h1 className={styles.container}>Home component</h1>
      <p>Both the below navigation should work!</p>
      <a href="/users">Users via server render</a>
      <br />
      <Link to="/users">Users via react router link</Link>
    </div>
  )
}

export default Home
