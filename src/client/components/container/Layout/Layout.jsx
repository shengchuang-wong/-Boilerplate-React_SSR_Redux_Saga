import React from 'react'
import PropTypes from 'prop-types'

import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <main className={styles.container}>
      <section className={styles.side}></section>
      <section className={styles.content}>{children}</section>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Layout
