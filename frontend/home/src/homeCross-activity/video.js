import React from 'react';

/************************************************/
/*————————————引入videojs及相关配置文件————————————*/
import VP from 'video.js';
import 'video.js/dist/video-js.min.css';
import SWF_PATH from 'video.js/dist/video-js.swf';
import VTTJS_PATH from 'file!videojs-vtt.js/dist/vtt.min.js';
VP.options.flash.swf = SWF_PATH;
VP.options['vtt.js'] = VTTJS_PATH;
/*——————————————————————————————————————————————*/
/************************************************/

import './style.less';

export default class Video extends React.Component
{
	static propTypes = {
        width: React.PropTypes.number.isRequired,
        url:React.PropTypes.number.isRequired,
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
				{/*<source src="video/demo.flv" type="video/flv" />*/}
				<source src={this.props.url} type="video/flv" />
			</video>
		</div>
	}
}
