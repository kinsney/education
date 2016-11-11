import React from 'react';

import { Row, Col } from 'antd';
import { Menu, Icon } from 'antd';
const MenuItem = Menu.Item;

import './style.less';
import HotCard from './hotCard';
import Card from './card';

export default class Course extends React.Component
{
	render()
	{
		return <div className="crossCourse"><div className="crossCont">
			<div className="topBar">
				<Row gutter={24}>
					<Col span={6}> <h1>热门公开课</h1> </Col>
					<Col span={12}>
						<Menu selectedKeys={["home"]} mode="horizontal">
							<MenuItem key="home">航模及无人机</MenuItem>
							<MenuItem key="course">机械工程</MenuItem>
							<MenuItem key="activity">电学</MenuItem>
							<MenuItem key="lab">电子信息</MenuItem>
							<MenuItem key="forum">化学</MenuItem>
							<MenuItem key="science">前言科技</MenuItem>
						</Menu>
					</Col>
					<Col span={6}>
						<div className="more" style={{textAlign:'right'}}>
							<a href="">
							<span>更多课程</span> &nbsp;
							<Icon type="right-circle" />
							</a>
						</div>
					</Col>
				</Row>
			</div>
			<div className="courses">
				<Row gutter={24}>
					<Col span={6}><HotCard /></Col>
					<Col span={18}>
						<Row gutter={24}>
							<Col span={8}><Card /></Col>
							<Col span={8}><Card /></Col>
							<Col span={8}><Card /></Col>
						</Row>
						<div style={{height:'20px'}}></div>
						<Row gutter={24}>
							<Col span={8}><Card /></Col>
							<Col span={8}><Card /></Col>
							<Col span={8}><Card /></Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div> </div>
	}
}