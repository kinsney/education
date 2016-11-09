import React from 'react';

import { Carousel } from 'antd';

export default class HotCard extends React.Component
{
	render()
	{
		return <div className="hotCard">
			<Carousel autoplay speed={1000} dots={true}>
				<div className="cover"><img src="image/home/course/hot1.png"/></div>
				<div className="cover"><img src="image/home/course/hot1.png"/></div>
				<div className="cover"><img src="image/home/course/hot1.png"/></div>
				<div className="cover"><img src="image/home/course/hot1.png"/></div>
			</Carousel>
			<div className="info">
				<h5>2016线下课程开发报名</h5>
				<p>2016年12月12日</p>
				<a>报 名</a>
			</div>
		</div>
	}
}