import React from 'react';

import { Row, Col } from 'antd';
import './style.less';
import Card from './card';

export default class Steam extends React.Component
{
	state = {
		cards:[
			{ 
				imgsrc: require('./img/1.png'),
				title: '创客课程',
				profile: '卡斯加大双卡双待，是扩大化的熟练的反馈的，速度快减肥哈克的事大法师打发，速度快发货的发生的',
				alink: 'http://www.baidu.com',
				atxt: '开始学习'
			},
			{ 
				imgsrc: require('./img/2.png'),
				title: '创新实验室',
				profile: '卡斯加大双卡双待，是扩大化的熟练的反馈的，速度快减肥哈克的事大法师打发，速度快发货的发生的',
				alink: 'http://www.baidu.com',
				atxt: '了解更多'
			},
			{ 
				imgsrc: require('./img/3.png'),
				title: '科技夏令营',
				profile: '卡斯加大双卡双待，是扩大化的熟练的反馈的，速度快减肥哈克的事大法师打发，速度快发货的发生的',
				alink: 'http://www.baidu.com',
				atxt: '了解更多'
			},
			{ 
				imgsrc: require('./img/4.png'),
				title: '创客社区',
				profile: '卡斯加大双卡双待，是扩大化的熟练的反馈的，速度快减肥哈克的事大法师打发，速度快发货的发生的',
				alink: 'http://www.baidu.com',
				atxt: '马上加入'
			}
		]
	}
	constructor(props) { super(props); }

	render()
	{
		var items = [];
		this.state.cards.forEach((item,index)=>
		{
			var card = <Col key={index} span={6}><Card {...item}/></Col>
			items.push(card);
		});

		return <div className="crossSteam"> <div className="crossCont">
			<h1>延河创客教育</h1>
			<h4>科学（Science）+技术（Technology）+工程（Engineering）+艺术（Arts）+数学（Mathematics）</h4>
			<Row gutter={24}>
				{items}
			</Row>
		</div> </div>
	}
}