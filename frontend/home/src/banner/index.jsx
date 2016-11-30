import React from 'react';

import {Icon,Carousel} from 'antd';
import './style.less';

import Loader from 'home/../Loader';


export default class Banner extends React.Component
{
	data = {
		imgUrls:[
			{"title": "测试", "image": "image/home/banner/1.png", "link": "http://www.baidu.com"},
	        {"title": "测试", "image": "image/home/banner/2.png", "link": "http://www.baidu.com"},
	        {"title": "测试", "image": "image/home/banner/3.png", "link": "http://www.baidu.com"},
	        {"title": "测试", "image": "image/home/banner/4.png", "link": "http://www.baidu.com"},
	        {"title": "测试", "image": "image/home/banner/5.png", "link": "http://www.baidu.com"},
	        {"title": "测试", "image": "image/home/banner/6.png", "link": "http://www.baidu.com"},
		]
	};
	constructor(props) {super(props);}
	componentWillMount()
	{
		var imgUrls = Loader.get("carousels");
		if(imgUrls) this.data.imgUrls = imgUrls;
	}

	render()
	{
		var Covers = this.data.imgUrls.map((item,index)=>{
			return <div key={index} className="cover" style={{backgroundImage:"url('"+item.image+"')"}}>
				<a href={item.link} target="_blank"></a>
			</div>
		});

		return <div className="banner">
			<Carousel autoplay speed={5000} draggable={false} dots={false}>
				{Covers}
			</Carousel>
			<div className="slogonBox">
				<div className="slogon">
					<h1>快乐<span>创</span>造</h1>
					<h2><span>Create</span> To Happy</h2>
					<h4>延河教育在线</h4>
					<p>满足中国两亿中小学生的科技学习需求</p>
					<div className="bottom">
						<span>开始创客之旅</span>
						<span className="downArrow"><Icon type="arrow-down" /></span>
					</div>
				</div>
			</div>
		</div>
	}
}
