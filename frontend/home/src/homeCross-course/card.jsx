import React from 'react';


export default class Card extends React.Component
{
	render()
	{
		return <div className="card">
			<div className="cover">
				<img src="image/home/course/card1.png"/>
			</div>
			<div className="info">
				<h5>十分钟教你制作一个超级炫酷的跑酷机器人</h5>
				<p>10:08</p>
				<a>免 费</a>
			</div>
		</div>
	}
}