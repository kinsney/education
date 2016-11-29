import React from 'react';

import { Row, Col, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Loader from 'home/../Loader';
import './style.less';

export class Card extends React.Component
{
	static propTypes = { 
		title: React.PropTypes.string.isRequired,
		thumbnail: React.PropTypes.string.isRequired,
		link: React.PropTypes.string.isRequired,
	};
	render()
	{
		return <div className="card">
			<div className="cover">
				<a className="shade" href={this.props.link }>
					<span className="left"></span>
					<span className="center">播 放</span>
					<span className="right"></span>
				</a>
				<img src={this.props.thumbnail}/>
			</div>
			<div className="info">
				<h5>{this.props.title}</h5>
			</div>
		</div>
	}
}

export default class GuessYouLike extends React.Component
{
	data = {
		lessons:
		[
			{title:'教你快速制作一个跑酷机器人',thumbnail:'image/home/course/card1.png',link:'#'},
			{title:'教你快速制作一个跑酷机器人',thumbnail:'image/home/course/card2.png',link:'#'},
			{title:'教你快速制作一个跑酷机器人',thumbnail:'image/home/course/card3.png',link:'#'},
			{title:'教你快速制作一个跑酷机器人',thumbnail:'image/home/course/card4.png',link:'#'},
			{title:'教你快速制作一个跑酷机器人',thumbnail:'image/home/course/card5.png',link:'#'},
		]
	};
	state = {
		nowIndex:0,
	};

	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
	}
	componentWillMount()
	{
		var lessons = Loader.get("lessons");
		if(lessons) this.data.lessons = lessons;
	}
	changeTab(index)
	{
		// console.log(index);
		this.setState({nowIndex:index});
	}
	render()
	{
		var LessonCards = this.data.lessons.map((item,index)=>{
			return <Card key={index} {...item}/>
		});

		return <div className="guessYouLike">
			<Tabs onChange={this.changeTab} 
				activeKey={this.state.nowIndex+''} type="card">
				<TabPane tab="猜你喜欢" key={0}>
					<div className="cards">
						{LessonCards}
					</div>
				</TabPane>
			</Tabs>
		</div>
	}
}