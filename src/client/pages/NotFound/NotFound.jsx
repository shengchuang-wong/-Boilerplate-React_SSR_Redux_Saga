import React from 'react'
import PropTypes from 'prop-types'
import styles from './NotFound.module.scss'

const NotFound = ({ staticContext }) => {
  if (staticContext) {
    staticContext.notFound = true
  }
  return <div className={styles.container}>Not found</div>
}

NotFound.propTypes = {
  staticContext: PropTypes.object
}

export default NotFound
