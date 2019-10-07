import { matchRoutes } from 'react-router-config';
import Home from '../home/Home'
import Users from '../users/Users';
import NotFound from './NotFound';

export const routes = [
    {
        loadData: undefined,
        routes: [
            {
                path: "/",
                exact: true,
               ...Home
            },
            {
                path: "/users",
                ...Users
            },
            {
                ...NotFound
            }
        ]
    }
];

function noOp() {}

export default function getData(path, store) {
    const matches = matchRoutes(routes, path);
    const matchRoute = matches
        .filter(m => !!m.route.fetchInitialData)
        .map(m => m.route.fetchInitialData(store));
    return matchRoute;
}