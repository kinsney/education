import React from 'react';
import ReactDOM from 'react-dom';

import Header from './src/header/index';
import PlayerPanel from './src/videoPlayPanel/index';

import Footer from './src/footer/index';

import Loader from './Loader';


if(module.hot) 
{
	module.hot.accept();
}

class PageVideo extends React.Component
{
	render()
	{
		return 	<div>
			<Header></Header>
			<div style={{backgroundColor:'#fbfbfb'}}>
				<PlayerPanel/>
			</div>
			<Footer></Footer>
		</div>
	}
}

function initializer() 
{
	ReactDOM.render(<PageVideo/>, document.getElementById('home') );
}

Loader.addInitializer(initializer);
Loader.init({});

const contextModle = 
{
    
}

