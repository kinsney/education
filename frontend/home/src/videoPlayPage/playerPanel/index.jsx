import React from 'react';

import { Row, Col,Button } from 'antd';
import $ from 'jquery';
import VP from 'video.js';
import 'video.js/dist/video-js.min.css';

import VideoInfo from './info.jsx';
import './style.less';

export default class Footer extends React.Component
{
	componentDidMount()
	{
		var box = this.refs.playerBox;
		var element = this.refs.video;
		var option = 
		{
			example_option:true,
			height:$(box).height(),
			width:$(box).width(),
			controls:true,
			preload:"auto"
		};
		var callback = function(){};
		VP(element,option,callback);
	}
	render()
	{
		return <div className="playerPanel">
			<h1>十分钟教会你制作会跑酷的纸机器人</h1>
			<Row gutter={24}>
				<Col span={18}>
					<div className="player" ref="playerBox">
						<video ref="video" className="video-js vjs-default-skin">
							<source src="video/demo.flv" type="video/flv" />
						</video>
					</div>
					<div className="userInteract">
					</div>
				</Col>
				<Col span={6}>
					<VideoInfo />
					<div className="getDevice">
						<Button>一键获取教具</Button>
					</div>
				</Col>
			</Row>
		</div>
	}
}