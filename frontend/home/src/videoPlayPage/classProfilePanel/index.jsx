import React from 'react';

import { Row, Col, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import BarTitle from '../title';
import TeachTool from '../teachTool/index';
import Loader from 'home/../Loader';
import './style.less';

export default class ClassProfile extends React.Component
{
	data = {
		imgIcons : 
		[
			require('./img/1.png'),
			require('./img/2.png'),
			require('./img/3.png'),
			require('./img/4.png')
		],
		devices: 
		[
	        { name: "电子包", description: "这是描述", icon: "image/video/arduino.png" },
	        { name: "Arduno", description: "这是描述", icon: "image/video/arduino.png" },
	    ],
	    introduction: 
	    {
	        brief: "课程简介",
	        target: "课程目标",
	        groupSuit: "适合人群",
	        advice: "学习建议",
	        questions: 
	        [ 
	        	{title: "谁是傻逼", answer: "你是"},
	        	{title: "谁是傻逼", answer: "你是"}, 
	        	{title: "谁是傻逼", answer: "你是"}, 
	        	{title: "谁是傻逼", answer: "你是"}, 
	        	{title: "谁是傻逼", answer: "你是"}, 
	        ],
	        other:"<img src='image/video/other.png' />",
	    }
	};

	state = {
		nowIndex:0,
	};

	constructor(props)
	{
		super(props);
		this.changeTab = this.changeTab.bind(this);
	}
	componentWillMount()
	{
		var devices = Loader.get("video");
		var introduction = Loader.get("introduction");
		if(devices) this.data.devices = devices;
		if(introduction) this.data.introduction = introduction;
	}
	changeTab(index)
	{
		// console.log(index);
		this.setState({nowIndex:index});
	}
	render()
	{
		var imgIcons = this.data.imgIcons;
		var devices = this.data.devices;
		var intro = this.data.introduction;

		var TeachTools = devices.map((item,index)=>{
			return <TeachTool key={index} {...item} width={126}/>
		});
		var QandA = intro.questions.map((item,index)=>{
			return <div key={index} className="quesItem">
				<h5>Q{index}：{item.title}</h5>
				<p>{item.answer}</p>
			</div>
		});

		return <div className="profilePanel">
			<Tabs onChange={this.changeTab} activeKey={this.state.nowIndex+''} type="card" >
				<TabPane tab="课程介绍" key={0}>
					<div className="profile">
						<BarTitle title="课程简介"/>
						<div className="itemInfo">
							<Row gutter={32}>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={imgIcons[0]}/></Col>
										<Col span={18}> <h4>课程简介</h4> <p>{intro.brief}</p> </Col>
									</Row>
								</Col>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={imgIcons[1]}/></Col>
										<Col span={18}> <h4>课程目的</h4> <p>{intro.target}</p> </Col>
									</Row>
								</Col>
							</Row>
							<div style={{height:32}}></div>
							<Row gutter={32}>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={imgIcons[2]}/></Col>
										<Col span={18}> <h4>适合人群</h4> <p>{intro.groupSuit}</p> </Col>
									</Row>
								</Col>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={imgIcons[3]}/></Col>
										<Col span={18}> <h4>学习建议</h4> <p>{intro.advice}</p> </Col>
									</Row>
								</Col>
							</Row>
						</div>
						<BarTitle title="教具准备"/>
						<div className="itemInfo">
							<div className="tools">
								<h5>需要准备下列材料，各材料的使用详见图解步骤</h5>
								{TeachTools}
							</div>
						</div>
						<BarTitle title="常见问题"/>
						<div className="itemInfo">
							{QandA}
						</div>
						<BarTitle title="其他"/>
						<div className="itemInfo" dangerouslySetInnerHTML={{__html: intro.other}} />
					</div>
				</TabPane>
			</Tabs>
		</div>
	}
}