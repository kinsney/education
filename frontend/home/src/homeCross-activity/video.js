import React from 'react';

// import VP from 'video.js';
// import 'videojs-vtt.js';

import './style.less';

export default class Video extends React.Component
{
	static propTypes = {
        width: React.PropTypes.number.isRequired
    };
	componentDidMount()
	{
		var element = this.refs.video;
		var option = {"example_option":true};
		var callback = function(){};
		videojs(element,option,callback);
	}
	render()
	{
		return <div className="player">
			<video ref="video" class="video-js vjs-default-skin"
				controls preload="auto" width={this.props.width-32} height="500">
				<source src="video/demo.flv" type="video/flv" />
			</video>
		</div>
	}
}
