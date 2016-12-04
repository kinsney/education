import React from 'react';

import './style.less';
import { Row, Col, Menu, Popover, Button } from 'antd';
const MenuItem = Menu.Item;

import misago from 'misago/index';
import 'misago/initializers/reducers/auth';
import 'misago/initializers/modal';
import 'misago/initializers/ajax';
import 'misago/initializers/captcha';
import 'misago/initializers/zxcvbn';
import 'misago/initializers/include';
import 'misago/initializers/snackbar';
import 'misago/initializers/store';
import 'misago/initializers/auth';
import 'misago/initializers/local-storage';
import 'misago/initializers/components/user-menu';

import Loader from 'home/../Loader';

export default class Header extends React.Component
{
    static propTypes = { 
		currunt: React.PropTypes.string.isRequired,
	};
	static defaultProps = { 
		currunt: '',
	};
	constructor(props) {super(props);}

	componentDidMount()
	{
		var misagoContext = Loader.get('misagoContext');
		if(misagoContext)
		{
			misago.init(misagoContext);
		}
	}

	render()
	{
		var popcontent = <div><p>正在构建中 · · ·</p><p>敬请期待 · · ·</p></div>;
		return <div className="header">
			<div className="headCont">
				<Row>
					<Col span={4}>
						<div className="logo">
							<img src={require('./img/logo.png')}/>
						</div>
					</Col>
					<Col span={16}>
						<Menu selectedKeys={[this.props.currunt]} mode="horizontal">
							<MenuItem key="home"><a href="/">首页</a></MenuItem>
							<MenuItem key="course">
								<Popover content={popcontent} title="提示">
									<span style={{color:'#aaaaaa'}}>创客课程</span>
								</Popover>
							</MenuItem>
							<MenuItem key="activity">
								<Popover content={popcontent} title="提示">
									<span style={{color:'#aaaaaa'}}>创客活动</span>
								</Popover>
							</MenuItem>
							<MenuItem key="lab">
								<Popover content={popcontent} title="提示">
									<span style={{color:'#aaaaaa'}}>创客实验室</span>
								</Popover>
							</MenuItem>
							<MenuItem key="forum">
								<Popover content={popcontent} title="提示">
									<span style={{color:'#aaaaaa'}}>创客论坛</span>
								</Popover>
							</MenuItem>
						</Menu>
					</Col>
					<Col span={4}>
						<div id="user-menu-mount"> </div>
					</Col>
				</Row>
				
			</div>
		</div>
	}
}