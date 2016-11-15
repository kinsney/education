import React from 'react';

import { Icon, Modal, Button } from 'antd';

import './style.less';

export default class Boxin extends React.Component
{
	state = {
		visible: false,
		loading: false,
	};
	constructor(props) 
	{
		super(props);
		this.showModal = this.showModal.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	showModal(ev) 
	{
		this.setState({visible: true}); 
	}
	handleOk(ev) 
	{
		console.log(ev);
		this.setState({ loading: true });
		setTimeout(()=>{
			this.setState({ loading: false, visible: false });
		}, 3000);
	}
	handleCancel(ev) 
	{
		console.log(ev);
		this.setState({visible: false, });
	}

	render()
	{
		var loginFooter = <div>
			<Button type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
		    <Button type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>登录</Button>
		</div>;

		return <div>
			<Button type="ghost" onClick={this.showModal}>登录</Button>
			<Modal title="Basic Modal" 
				visible={this.state.visible} 
				onOk={this.handleOk} 
				onCancel={this.handleCancel}
				footer={loginFooter} >
				<p>some contents...</p>
				<p>some contents...</p>
				<p>some contents...</p>
			</Modal>
		</div>
	}
}