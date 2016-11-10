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
	}
	next() 
	{ 
		this.refs.slider1.refs.slick.slickNext();
		this.refs.slider2.refs.slick.slickNext(); 
	}
	previous() 
	{ 
		this.refs.slider1.refs.slick.slickPrev();
		this.refs.slider2.refs.slick.slickPrev();
	}
	render()
	{
		return <div className="crossLab">
			<Carousel autoplay ref="slider1" effect="fade" speed="1000" draggable={false} dots={false}>
				<div className="cover" style={{backgroundImage:"url('/image/home/lab/lab1.png')"}}></div>
				<div className="cover" style={{backgroundImage:"url('/image/home/lab/lab1.png')"}}></div>
				<div className="cover" style={{backgroundImage:"url('/image/home/lab/lab1.png')"}}></div>
				<div className="cover" style={{backgroundImage:"url('/image/home/lab/lab1.png')"}}></div>
			</Carousel>
			<div className="info">
				<Carousel autoplay ref="slider2" speed={1500} draggable={false} dots={false}>
					<div className="profile">
						<img src={require('./img/1.png')}/>
						<h1>创客实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
					<div className="profile">
						<img src={require('./img/1.png')}/>
						<h1>创客实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
					<div className="profile">
						<img src={require('./img/1.png')}/>
						<h1>创客实验室</h1>
						<p>谁考得好是，的加法打卡很多事开发的首付款，速度快接啊款到发货</p>
					</div>
					<div className="profile">
						<img src={require('./img/1.png')}/>
						<h1>创客实验室</h1>
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