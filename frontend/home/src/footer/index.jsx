import React from 'react';

import { Row, Col } from 'antd';
import './style.less';

export default class Footer extends React.Component
{
	render()
	{
		return <div className="footer">
		<div className="bar"></div>
		<div className="footCont">
			<Row>
				<Col span={9}>
					<div className="up"><img src={require('./img/logo.png')} /></div>
					<div className="down"><span>延河（北京）教育科技有限责任公司</span></div>
				</Col>
				<Col span={10}>
					<div className="up"><h4><span></span>快速链接</h4></div>
					<div className="down">
						<a href="">创客课程</a>
						<a href="">创客活动</a>
						<a href="">创客实验室</a>
						<a href="">创客论坛</a>
					</div>
				</Col>
				<Col span={5}>
					<div className="up"><h4><span></span>联系我们</h4></div>
					<div className="down"><span>北京市-海淀区-西土城路10号 100876</span></div>
				</Col>
			</Row>
		</div></div>
	}
}