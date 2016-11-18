import React from 'react';

import { Row, Col, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import BarTitle from '../title';
import TeachTool from '../teachTool/index';
import './style.less';

export default class ClassProfile extends React.Component
{
	data = {

	}
	state = {
		nowIndex:0,
	};

	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
	}
	componentWillMount()
	{
		
	}
	changeTab(index)
	{
		// console.log(index);
		this.setState({nowIndex:index});
	}
	render()
	{

		return <div className="profilePanel">
			<Tabs onChange={this.changeTab} activeKey={this.state.nowIndex+''} type="card" >
				<TabPane tab="课程介绍" key={0}>
					<div className="profile">
						<BarTitle title="课程简介"/>
						<div className="itemInfo">
							<Row gutter={32}>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={require('./img/1.png')}/></Col>
										<Col span={18}>
											<h4>课程简介</h4>
											<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
										</Col>
									</Row>
								</Col>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={require('./img/2.png')}/></Col>
										<Col span={18}>
											<h4>课程目的</h4>
											<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
										</Col>
									</Row>
								</Col>
							</Row>
							<div style={{height:32}}></div>
							<Row gutter={32}>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={require('./img/3.png')}/></Col>
										<Col span={18}>
											<h4>适合人群</h4>
											<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
										</Col>
									</Row>
								</Col>
								<Col span={12}>
									<Row gutter={16}>
										<Col span={6}><img src={require('./img/4.png')}/></Col>
										<Col span={18}>
											<h4>学习建议</h4>
											<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
										</Col>
									</Row>
								</Col>
							</Row>
						</div>
						<BarTitle title="教具准备"/>
						<div className="itemInfo">
							<div className="tools">
								<h5>总共需要准备5份材料，各材料的使用详见图解步骤</h5>
								<TeachTool width={126}/>
								<TeachTool width={126}/>
								<TeachTool width={126}/>
								<TeachTool width={126}/>
								<TeachTool width={126}/>
							</div>
						</div>
						<BarTitle title="常见问题"/>
						<div className="itemInfo">
							<div className="quesItem">
								<h5>Q：本来今天高高兴兴，你为什么要说这种袜？</h5>
								<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
							</div>
							<div className="quesItem">
								<h5>Q：本来今天高高兴兴，你为什么要说这种袜？</h5>
								<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
							</div>
							<div className="quesItem">
								<h5>Q：本来今天高高兴兴，你为什么要说这种袜？</h5>
								<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
							</div>
							<div className="quesItem">
								<h5>Q：本来今天高高兴兴，你为什么要说这种袜？</h5>
								<p>可接受的斯柯达打算打飞机阿道夫，四到卡上的是打发的说法，试试看较大阿斯顿发的说法是打发看看，速度快接发斯蒂芬上的看法是大法官</p>
							</div>
						</div>
						<BarTitle title="其他"/>
						<div className="itemInfo">
							<img src={require('./img/haha.png')} />
						</div>
					</div>
				</TabPane>
			</Tabs>
		</div>
	}
}