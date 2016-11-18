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
		var callback = function(){
			console.log(this)
		};
		videojs(element,option,callback);
	}
	render()
	{
		return <div className="player">
			<video ref="video" className="video-js vjs-default-skin"
					controls preload="auto" width={this.props.width-32} height="500">
				<source src="static/1.mp4" type="video/flv" />
			</video>
		</div>
	}
}
