import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Users from '../users/Users';
import NotFound from './NotFound';
import { renderRoutes } from 'react-router-config';
import { routes } from './getData'

export default function Layout() {
    return <div>{renderRoutes(routes[0].routes)}</div>;
    // return (
        // <div>
        //     <div>React SSR example</div>
            {/* <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/users" exact component={Users}></Route>
                <Route component={NotFound} />
            </Switch> */}
            // {renderRoutes(routes[0].routes)}
        // </div>
    // );
}