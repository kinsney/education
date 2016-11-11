import React from 'react';

import {Icon} from 'antd'
import './style.less';

export default class Banner extends React.Component
{
	render()
	{
		return <div className="banner" style={{backgroundImage:"url('/static/image/home/banner.png')"}}>
			<div className="slogon">
				<h1>快乐<span>创</span>造</h1>
				<h2><span>Create</span> To Happy</h2>
				<h4>延河教育在线</h4>
				<p>满足中国两亿中小学生的科技学习需求</p>
				<div className="bottom">
					<span>开始创客之旅</span>
					<span className="downArrow"><Icon type="arrow-down" /></span>
				</div>
			</div>
		</div>
	}
}
