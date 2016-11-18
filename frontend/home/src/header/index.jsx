import React from 'react';

import './style.less';
import { Row, Col, Menu } from 'antd';
const MenuItem = Menu.Item;

import misago from 'misago/index';
import 'misago/initializers/reducers/auth';
import 'misago/initializers/modal';
import 'misago/initializers/ajax';
import 'misago/initializers/store';
import 'misago/initializers/auth';
import 'misago/initializers/local-storage';
import 'misago/initializers/components/user-menu';

import Loader from 'home/../Loader';

export default class Header extends React.Component
{
	data = {
        menu:
        [
        	{key:'home', txt:'首页', url:"http://www.baidu.com"},
        	{key:'course', txt:'创客课程', url:"http://www.baidu.com"},
        	{key:'activity', txt:'创客活动', url:"http://www.baidu.com"},
        	{key:'lab', txt:'创客实验室', url:"http://www.baidu.com"},
        	{key:'forum', txt:'创客论坛', url:"http://www.baidu.com"},
        ]
    };
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
		var menuItems = this.data.menu.map((item)=>
		{
			if(item.key==this.props.currunt) return <MenuItem key={item.key}>{item.txt}</MenuItem>;
			else return <MenuItem key={item.key}><a href={item.url}>{item.txt}</a></MenuItem>;
		});

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
							{menuItems}
						</Menu>
					</Col>
					<Col span={4}>
						<div id="user-menu-mount"></div>
					</Col>
				</Row>
				
			</div>
		</div>
	}
}