import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';


import PageHome from 'home/pageHome';
import PageVideo from 'home/pageVideo';
import Loader from './Loader';


if(module.hot)
{
	module.hot.accept();
}

class Page extends React.Component
{
	render()
	{
		return 	<Router history={browserHistory}>
			<Route path="/" component={PageHome} />
			<Route path="/lesson/:slug" component={PageVideo} />
		</Router>
	}
}

function initializer()
{
	ReactDOM.render(<Page/>, document.getElementById('home') );
}
Loader.addInitializer(initializer);
// Loader.init({});









