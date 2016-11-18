import React from 'react';

import { Row, Col, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import './style.less';

export class Card extends React.Component
{
	data = {
    	itemdata:
    	{
    		"title": "十分钟教你制作一个超级炫酷的跑酷机器人",
	        "thumbnail": "image/home/course/card2.png",
	        "link": "http://www.baidu.com",
    	}
    };
	render()
	{
		var info = this.data.itemdata;
		return <div className="card">
			<div className="cover">
				<img src={info.thumbnail}/>
			</div>
			<div className="info">
				<h5>{info.title}</h5>
			</div>
		</div>
	}
}

export default class GuessYouLike extends React.Component
{
	state = {
		nowIndex:0,
	};

	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
	}
	componentWillMount()
	{
		
	}
	changeTab(index)
	{
		// console.log(index);
		this.setState({nowIndex:index});
	}
	render()
	{
		return <div className="guessYouLike">
			<Tabs onChange={this.changeTab} 
				activeKey={this.state.nowIndex+''} type="card">
				<TabPane tab="猜你喜欢" key={0}>
					<div className="cards">
						<Card/>
						<Card/>
						<Card/>
						<Card/>
					</div>
				</TabPane>
			</Tabs>
		</div>
	}
}