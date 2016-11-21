import React from 'react';


export default class Card extends React.Component
{
	data = {
    	itemdata:
    	{
    		"title": "十分钟教你制作一个超级炫酷的跑酷机器人",
	        "thumbnail": "image/home/course/card2.png",
	        "link": "http://www.baidu.com",
	        "price": 0,
	        "time" : "10:08",
	        "equipment": "卡斯大|上的法|三大|是打发"
    	}
    };

	static propTypes = {
        itemdata: React.PropTypes.object.isRequired
    };

	render()
	{
		var info = this.props.itemdata;

		return <div className="card">
			<div className="cover">
				<a href={info.link }><img src={info.thumbnail}/></a>
			</div>
			<div className="info">
				<h5>{info.title}</h5>
				<p>{info.time}</p>
				<a>{info.price==0?"免费":("￥"+info.price)}</a>
			</div>
		</div>
	}
}
