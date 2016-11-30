import React from 'react';
import ReactDOM from 'react-dom';

import Header from './src/header/index';
import Banner from './src/banner/index';
import Steam from './src/homeCross-steam/index';
import Course from './src/homeCross-course/index';
import Laboratory from './src/homeCross-lab/index';
import Activity from './src/homeCross-activity/index';
import Footer from './src/footer/index';

import Loader from './Loader';


if(module.hot)
{
	module.hot.accept();
}

class PageHome extends React.Component
{
	render()
	{
		return 	<div>
			<Header currunt={'home'}></Header>
			<Banner></Banner>
			<Steam></Steam>
			<Course></Course>
			<Laboratory></Laboratory>
			<Activity></Activity>
			<Footer></Footer>
		</div>
	}
}

function initializer()
{
	ReactDOM.render(<PageHome/>, document.getElementById('home') );
}

Loader.addInitializer(initializer);
// Loader.init({});


