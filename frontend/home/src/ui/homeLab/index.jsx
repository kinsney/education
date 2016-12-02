import React from 'react';

import { Carousel,Icon } from 'antd';
import './style.less';

export default class laboratory extends React.Component
{
	constructor(props)
	{
		super(props);
		this.next = this.next.bind(this)
    	this.previous = this.previous.bind(this)
    	this.changeTab = this.changeTab.bind(this)
	}
	next() { this.refs.slider2.refs.slick.slickNext(); }
	previous() { this.refs.slider2.refs.slick.slickPrev(); }
	changeTab(fromIndex,toIndex)
	{
		// console.log(fromIndex,":",toIndex);
		this.refs.slider1.refs.slick.slickGoTo(toIndex);
	}
	render()
	{
		return <div className="crossLab">
			<a name="lab"></a>
			<Carousel ref="slider1" effect="fade" speed={1500} draggable={false} dots={false}>
				<div className="cover" style={{backgroundImage:"url('/static/image/home/lab/1.png')"}}></div>
				<div className="cover" style={{backgroundImage:"url('/static/image/home/lab/2.png')"}}></div>
				<div className="cover" style={{backgroundImage:"url('/static/image/home/lab/3.png')"}}></div>
				<div className="cover" style={{backgroundImage:"url('/static/image/home/lab/4.png')"}}></div>
			</Carousel>
			<div className="info">
				<Carousel autoplay ref="slider2" speed={1500} draggable={false} dots={false} beforeChange={this.changeTab}>
					<div className="profile">
						<img src={require('./img/1.png')}/>
						<h1>基础创客实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
					<div className="profile">
						<img src={require('./img/2.png')}/>
						<h1>航模及无人机实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
					<div className="profile">
						<img src={require('./img/3.png')}/>
						<h1>机器人实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
					<div className="profile">
						<img src={require('./img/4.png')}/>
						<h1>电子信息实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
				</Carousel>
				<div className="arrow">
					<div onClick={this.previous} className="left"><Icon type="left" /></div>
					<div onClick={this.next} className="right"><Icon type="right" /></div>
				</div>
			</div>
		</div>
	}
}
