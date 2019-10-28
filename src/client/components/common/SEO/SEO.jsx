import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={unescape(description)} />
      {/* <meta
        name="copyright"
        content={`
          Copyright © ${new Date().getFullYear()} Singapore: Yolo Technology Pte Ltd. All Rights Reserved.
          Philippines: Etos Adtech Corporation
        `}
      />
      <meta name="author" content="YOLO Technology" /> */}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default SEO
