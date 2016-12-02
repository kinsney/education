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
        url:React.PropTypes.number.isRequired,
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
		this.setState({visible:true});
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
		this.setState({visible: false});
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
			<div className="playBtn" onClick={this.showModal}>
				<Icon type="play-circle-o" />&nbsp;&nbsp;&nbsp;
				<span>播放</span>
			</div>
			<Modal title="Basic Modal" 
				visible={this.state.visible} 
				onOk={this.handleOk}
				width={this.state.width}
				onCancel={this.handleCancel}
				maskClosable={false}
				footer={loginFooter} >
				{this.state.visible?<Video url={this.props.url} width={this.state.width}/>:<div className="player"></div>}
			</Modal>
		</div>
	}
}