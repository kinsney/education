import React from 'react';
import ReactDOM from 'react-dom';

import Header from './src/header/index';
import Banner from './src/banner/index';
import Steam from './src/homeCross-steam/index';
import Course from './src/homeCross-course/index';
import Laboratory from './src/homeCross-lab/index';
import Activity from './src/homeCross-activity/index';
import Footer from './src/footer/index';

if(module.hot) 
{
	module.hot.accept();
}


function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'promise done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});

export default class HomePage extends React.Component
{
	render()
	{
		return 	<div>
			<Header></Header>
			<Banner></Banner>
			<Steam></Steam>
			<Course></Course>
			<Laboratory></Laboratory>
			<Activity></Activity>
			<Footer></Footer>
		</div>
	}
}
ReactDOM.render(<HomePage/>, document.getElementById('home') );
