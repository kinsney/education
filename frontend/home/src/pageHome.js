import React from 'react';
import ReactDOM from 'react-dom';


import Header from 'home/ui/header/index';
import Banner from 'home/ui/banner/index';
import Steam from 'home/ui/homeSteam/index';
import Course from 'home/ui/homeCourse/index';
import Laboratory from 'home/ui/homelab/index';
import Activity from 'home/ui/homeActivity/index';
import Footer from 'home/ui/footer/index';


export default class PageHome extends React.Component
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



