import React from 'react';

import './style.less';

export default class TeachTool extends React.Component
{
	static propTypes = { 
		name: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
	};
	static defaultProps = {
		width:"100%",
	};
	render()
	{

		return <div className="teachTool" style={{width:this.props.width}}>
			<img src={this.props.icon} />
			<p>{this.props.name}</p>
			<span>{this.props.description}</span>
		</div>
	}
}