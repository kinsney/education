import React from 'react';

import { Carousel,Icon,Row,Col } from 'antd';

import './style.less';


import VModal from './vModal'
import Loader from 'home/../Loader';

export default class Activity extends React.Component
{
	data = {
		"activities":
	    [
	        {
	            "title": "2017创客活动",
	            "profile":"看得见啊是看得见风案例老师的，谁考得好交罚款，是打了打飞机是打发，是肯定会发离开家打发打发卡斯加大回复阿道",
	            "video": "http://www.baidu.com",
	            "thumbnail": "image/home/activity/1.png",
	        },
	        {
	            "title": "沙发斯蒂芬",
	            "profile":"看得见啊是看得见风案例老师的，谁考得好交罚款，是打了打飞机是打发，是肯定会发离开家打发打发卡斯加大回复阿道",
	            "video": "http://www.baidu.com",
	            "thumbnail": "image/home/activity/2.png",
	        }
	    ]
	};
	constructor(props)
	{
		super(props);
		this.next = this.next.bind(this)
    	this.previous = this.previous.bind(this)
	}
	next() { this.refs.slider.refs.slick.slickNext();}
	previous() { this.refs.slider.refs.slick.slickPrev(); }
	componentWillMount()
	{
		var activities = Loader.get("activities");
		if (activities) this.data.activities = activities;
	}
	render()
	{
		var Videos = this.data.activities.map((item,index)=>{
			return <div key={index} className="activity">
			<div style={{backgroundImage:"url('"+item.thumbnail+"')"}}>
				<h2>{item.title}</h2> <p>{item.profile}</p>
				<VModal url={item.video}/>
			</div></div>
		});

		return <div className="crossActivity"> <div className="crossCont">
			<h1>创客活动</h1>
			<h5>时空裂痕是看得见，奥斯卡的哈大量的收发货开始打</h5>
			<Row>
				<Col span={1}><div onClick={this.previous} className="icon"><Icon type="left-circle-o"/></div></Col>
				<Col span={22}>
					<Carousel ref="slider" dots={false} slidesToShow={2} >
						{Videos}
					</Carousel>
				</Col>
				<Col span={1}><div onClick={this.next} className="icon"><Icon type="right-circle-o"/></div></Col>
			</Row>
		</div> </div>
	}
}
