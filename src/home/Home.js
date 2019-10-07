import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import styles from './Home.module.scss';
import './Home.scss';

const Home = () => {
    return (
        <div>
            <Helmet>
              <title>Home page</title>
              <meta name="description" content="Home page description" />
            </Helmet>
            <h1 className={styles.container}>Home component</h1>
            <p>Both the below navigation should work!</p>
            <a href="/users">Users via server render</a>
            <br />
            <Link to="/users">Users via react router link</Link>
        </div>
    );
}

export default {
    component: Home
}