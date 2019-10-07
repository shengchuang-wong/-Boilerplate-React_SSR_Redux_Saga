import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { fetchUsers } from '../client/actions';
import { connect } from 'react-redux';

const Users = ({ users, isFetchingUsers, fetchUsersRequest }) => {
  useEffect(() => {
    fetchUsersRequest();
  }, [fetchUsersRequest]);

  return (
    <div>
      <Helmet>
        <title>Users page</title>
        <meta name="description" content="Users page description" />
      </Helmet>
      <h1>Users component</h1>
      <Link to="/">Back to home page</Link>
      <h2>List of users</h2>
      <ul>
        {users.length ? users.map(user => (
          <li key={user.id}>{user.name}</li>
        )) : null}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { 
    isFetchingUsers: state.users.fetching,
    users: state.users.response
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsersRequest: () =>
    dispatch(fetchUsers()),
})

export default {
  fetchInitialData: (store) => {
    return store.dispatch(fetchUsers());
  },
  component:  connect(mapStateToProps, mapDispatchToProps)(Users)
}