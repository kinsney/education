import React from 'react';

import './style.less';

export default class TeachTool extends React.Component
{
	data = {
		imgIcon:{
			arduino:()=>{ return require('./img/arduino.png'); },
		}
	};
	static propTypes = { 
		key: React.PropTypes.object.isRequired,
		num: React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
	};
	static defaultProps = { 
		key: "arduino",
		num: 2,
		title: "作为芯片使用",
		width:"100%"
	};
	render()
	{
		var imgIcon = this.data.imgIcon[this.props.key]();

		return <div className="teachTool" style={{width:this.props.width}}>
			<img src={imgIcon} />
			<p>{this.props.key+"*"+this.props.num}</p>
			<span>{this.props.title}</span>
		</div>
	}
}