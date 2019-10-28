import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../../actions'
import { connect } from 'react-redux'
import SEO from 'client/components/common/SEO/SEO'
import styles from './Users.module.scss'

const Users = ({ users, isFetchingUsers, fetchUsersRequest }) => {
  useEffect(() => {
    fetchUsersRequest()
  }, [fetchUsersRequest])

  return (
    <div>
      <SEO title="Users page" description="Users page description" />
      <h1>Users component</h1>
      <Link to="/">Back to home page</Link>
      <h2 className={styles.title}>
        List of users {isFetchingUsers ? '...' : ''}
      </h2>
      <ul>
        {users.length
          ? users.map(user => <li key={user.id}>{user.name}</li>)
          : null}
      </ul>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array,
  isFetchingUsers: PropTypes.bool,
  fetchUsersRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    isFetchingUsers: state.users.fetching,
    users: state.users.response
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsersRequest: () => dispatch(fetchUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
