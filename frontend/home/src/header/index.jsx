import React from 'react';

import './style.less';
import { Row, Col, Menu, Icon } from 'antd';
const MenuItem = Menu.Item;

export default class Header extends React.Component
{
	constructor(props) 
	{
        super(props);
        this.state = {currunt:'home'};
    }

	render()
	{
		return <div className="header">
			<div className="headCont">
				<Row>
					<Col span={4}>
						<div className="logo">
							<img src={require('./img/logo.png')}/>
						</div>
					</Col>
					<Col span={16}>
						<Menu selectedKeys={["home"]} mode="horizontal">
							<MenuItem key="home">首页</MenuItem>
							<MenuItem key="course">创客课程</MenuItem>
							<MenuItem key="activity">创客活动</MenuItem>
							<MenuItem key="lab">创客实验室</MenuItem>
							<MenuItem key="forum">创客论坛</MenuItem>
						</Menu>
					</Col>
					<Col span={4}>
						<div className="loginBox">
							<Icon type="github" />
							<span>我是赵日天</span>
						</div>
					</Col>
				</Row>
				
			</div>
		</div>
	}
}