import React from 'react';

import {Icon,Carousel} from 'antd';
import './style.less';

import $ from 'jquery';

export default class Banner extends React.Component
{
	state = {
		imgUrls:[
			"image/home/banner/1.png",
			"image/home/banner/1.png",
		]
	};
	constructor(props) {super(props);}
	componentDidMount()
	{
		// ajax 获取图像url
		var _this = this;
		$.ajax(
		{
			type:'GET',
			url:"",
			success:function(data) {
				_this.setState({imgUrls:["image/home/banner/1.png","image/home/banner/1.png"]});
			},
			error:()=>{ console.log('hahah we failed!!!') }
		});

		console.log('ajax has been done!!');
	}

	render()
	{
		var Covers = this.state.imgUrls.map((item,index)=> {
			return <div key={index} className="cover" style={{backgroundImage:"url('"+item+"')"}}></div>
		});

		return <div className="banner">
			<Carousel autoplay ref="slider1" speed={1000} draggable={false} dots={false}>
				{Covers}
			</Carousel>
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
	}
}