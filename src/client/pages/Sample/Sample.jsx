import React from 'react'
import SEO from 'client/components/common/SEO/SEO'
import Layout from 'client/components/container/Layout/Layout'

import styles from './Sample.module.scss'

const Sample = () => {
  return (
    <Layout>
      <SEO title="Sample" description="Sample description" />
      <h1>Sample component</h1>
      <div className={styles.customDiv}></div>
    </Layout>
  )
}

export default Sample
