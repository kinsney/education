import React from 'react';

import VP from 'video.js';
import 'video.js/dist/video-js.min.css';

import './style.less';

export default class Video extends React.Component
{
	static propTypes = {
        width: React.PropTypes.number.isRequired
    };
    constructor(props)
	{
		super(props);
	}
	componentDidMount()
	{
		var element = this.refs.video;
		var option = {"example_option":true};
		var callback = function(){};
		var player = VP(element,option,callback);
	}
	render()
	{
		return <div className="player">
			<video ref="video" className="video-js vjs-default-skin"
				controls preload="auto" width={this.props.width-32} height="525">
				<source src="video/demo.flv" type="video/flv" />
			</video>
		</div>
	}
}
