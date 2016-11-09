import React from 'react';

import { Carousel,Icon,Row,Col } from 'antd';
import './style.less';

export default class Activity extends React.Component
{
	constructor(props)
	{
		super(props);
		this.next = this.next.bind(this)
    	this.previous = this.previous.bind(this)
	}
	next() { this.refs.slider.refs.slick.slickNext(); }
	previous() { this.refs.slider.refs.slick.slickPrev(); }
	render()
	{
		return <div className="crossActivity"> <div className="crossCont">
			<h1>创客活动</h1>
			<h4>时空裂痕是看得见，奥斯卡的哈大量的收发货开始打</h4>
			<Row>
				<Col span={1}><div onClick={this.previous} className="icon"><Icon type="left-circle-o"/></div></Col>
				<Col span={22}>
					<Carousel ref="slider" dots={false} slidesToShow={2} >
						<div className="activity">
						<div style={{backgroundImage:"url('/image/home/activity/1.png')"}}>
							<h3>2017创客活动</h3>
							<p>看得见啊是看得见风案例老师的，谁考得好交罚款，是打了打飞机是打发，是肯定会发离开家打发打发卡斯加大回复阿道</p>
							<a href="">
								<Icon type="play-circle-o" />&nbsp;&nbsp;&nbsp;
								<span>播放</span>
							</a>
						</div></div>
						<div className="activity">
						<div style={{backgroundImage:"url('/image/home/activity/2.png')"}}>
							<h3>2017创客活动</h3>
							<p>看得见啊是看得见风案例老师的，谁考得好交罚款，是打了打飞机是打发，是肯定会发离开家打发打发卡斯加大回复阿道</p>
							<a href="">
								<Icon type="play-circle-o" />&nbsp;&nbsp;&nbsp;
								<span>播放</span>
							</a>
						</div></div>
					</Carousel>
				</Col>
				<Col span={1}><div onClick={this.next} className="icon"><Icon type="right-circle-o"/></div></Col>
			</Row>
		</div> </div>
	}
}