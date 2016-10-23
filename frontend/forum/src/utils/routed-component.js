// jshint ignore:start
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import {Router, useRouterHistory } from 'react-router';
import {createHistory } from 'history'
import store from 'misago/services/store';
const rootElement = document.getElementById('page-mount');

const browserHistory = useRouterHistory(createHistory)({basename: '/'})

export default function(options) 
{
    let routes = 
    {
        component: options.component || null,
        childRoutes: []
    };

    if (options.root) 
    {
        routes.childRoutes = [
        {
            path: options.root,
            onEnter: function(nextState, replaceState) {replaceState(null, options.paths[0].path); }
        }].concat(options.paths);
    } 
    else {routes.childRoutes = options.paths; }

    ReactDOM.render( 
        <Provider store={store.getStore()}>
            <Router routes={routes} history={browserHistory} />
        </Provider>,
        rootElement
    );
}