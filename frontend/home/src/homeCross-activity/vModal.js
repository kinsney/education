import React from 'react';
import { Icon, Modal, Button } from 'antd';

import Video from './video'

import './style.less';

export default class VModal extends React.Component
{
	state = {
		visible: false,
		loading: false,
		width:960,
	};
	static propTypes = {
        "vid": React.PropTypes.string.isRequired
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
	componentDidMount()
	{
	}
	render()
	{
		var loginFooter = <div>
			<Button type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
		    <Button type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>登录</Button>
		</div>;

		loginFooter = <div></div>

		return <div>
			<Button type="ghost" onClick={this.showModal}>播放</Button>
			<Modal title="Basic Modal" 
				visible={this.state.visible} 
				onOk={this.handleOk}
				width={this.state.width}
				onCancel={this.handleCancel}
				footer={loginFooter} >
				<Video width={this.state.width}/>
			</Modal>
		</div>
	}
}