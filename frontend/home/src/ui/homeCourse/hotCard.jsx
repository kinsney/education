import React from 'react';

import { Carousel } from 'antd';

export default class HotCard extends React.Component
{
	data = {
        itemdata:
        [
	        {
	            "title": "2017创客",
	            "date" : "2016年12月12日",
	            "image": "/image/home/course/hot1.png",
	            "link": "http://www.baidu.com"
	        },
	        {
	            "title": "2018创客活动",
	            "date" : "2016年12月12日",
	            "image": "/image/home/course/hot2.png",
	            "link": "http://www.baidu.com"
	        },
	    ]
    };
    
	static propTypes = {
        itemdata: React.PropTypes.array.isRequired
    };
    
	render()
	{
		var Covers = this.props.itemdata.map((item,index)=>{
			return <div key={index}>
				<div className="cover"><img src={item.image}/></div>
				<div className="info">
					<h5>{item.title}</h5>
					<p>{item.date}</p>
					<a href={item.link} target="_black">报 名</a>
				</div>
			</div>
		});
		return <div className="hotCard">
			<Carousel autoplay speed={1000} dots={true}>
				{Covers}
			</Carousel>
		</div>
	}
}