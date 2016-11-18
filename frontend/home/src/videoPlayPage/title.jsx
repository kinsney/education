import React from 'react';

import './style.less';

export default class BarTitle extends React.Component
{
	static propTypes = { 
		title: React.PropTypes.string.isRequired,
	};
	static defaultProps = { 
		title: "这是一个标题",
	};
	render()
	{
		return <div className="barTitle">
			<span></span>
			<h3>{this.props.title}</h3>
		</div>
	}
}