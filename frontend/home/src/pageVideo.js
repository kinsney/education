import React from 'react';
import ReactDOM from 'react-dom';


import Header from 'home/ui/header/index';
import PlayerPage from 'home/ui/videoPage/index';
import Footer from 'home/ui/footer/index';


export default class PageVideo extends React.Component
{
	render()
	{
		return 	<div>
			<Header></Header>
			<PlayerPage/>
			<Footer></Footer>
		</div>
	}
}

