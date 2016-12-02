import React from 'react';

import { Icon, Modal, Button } from 'antd';

import './style.less';

export default class Boxout extends React.Component
{
	state = {  };
	constructor(props) 
	{
		super(props);
		// this.showModal = this.showModal.bind(this);
	}
	render()
	{
		return <div>
			<Icon type="github" />
			<span>我是赵日天</span>
		</div>
	}
}