import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  // eslint-disable-next-line
  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, hasError: true })
  }

  render() {
    const { children } = this.props

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ErrorBoundary
