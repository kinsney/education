import React from 'react';

import { Row, Col,Button } from 'antd';
import $ from 'jquery';
import VP from 'video.js';
import 'video.js/dist/video-js.min.css';

import VideoInfo from './info.jsx';
import Loader from 'home/../Loader';
import './style.less';

export default class Footer extends React.Component
{
	data = {
		video:{ name:"",url: "video/demo.flv", type: "video/flv" },
	};
	componentWillMount()
	{
		var video = Loader.get("video");
		if(video) this.data.video = video;
	}
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
		var item = this.data.video;
		return <div className="playerPanel">
			<h1>{ item.name }</h1>
			<Row gutter={24}>
				<Col span={18}>
					<div className="player" ref="playerBox">
						<video ref="video" className="video-js vjs-default-skin">
							<source src={item.url} type={item.type} />
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
