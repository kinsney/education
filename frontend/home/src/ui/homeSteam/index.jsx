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
				profile: '公司拥有航模及无人机、机械工程、电子信息、电学、化学、前沿科技六大类创客课程，目前课时数为392课时。',
				alink: '#course',
				atxt: '开始学习'
			},
			{ 
				imgsrc: require('./img/2.png'),
				title: '创新实验室',
				profile: '公司拥有基础创客实验室、航模及无人机实验室、机器人实验室、电子信息实验室4类实验室整体解决方案。',
				alink: '#lab',
				atxt: '了解更多'
			},
			{ 
				imgsrc: require('./img/3.png'),
				title: '科技夏令营',
				profile: '公司包含航模及无人机夏令营、机器人夏令营、前沿科技夏令营等科技营方案，帮助学生来北京接触科技创新的。',
				alink: '#activity',
				atxt: '了解更多'
			},
			{ 
				imgsrc: require('./img/4.png'),
				title: '创客社区',
				profile: '创客的核心本质在于学生通过启发、探索和讨论，基于对基本科学原理的理解，动手达成自己的科技目标和想法。',
				alink: 'javascript:void(0);',
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
			<h5>科学（Science）+技术（Technology）+工程（Engineering）+艺术（Arts）+数学（Mathematics）</h5>
			<Row gutter={24}>
				{items}
			</Row>
		</div> </div>
	}
}