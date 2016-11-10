import React from 'react';

export default class Card extends React.Component
{
	static propTypes = { 
		imgsrc: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		profile: React.PropTypes.string.isRequired,
		alink: React.PropTypes.string.isRequired,
		atxt: React.PropTypes.string.isRequired
	};
	static defaultProps = { 
		imgsrc: '0.png',
		title: '标题',
		profile: '卡斯加大双卡双待，是扩大化的熟练的反馈的，速度快减肥哈克的事大法师打发，速度快发货的发生的',
		alink: 'http://www.baidu.com',
		atxt: '了解更多'
	};
	render()
	{
		return <div className="card">
			<div className="logo">
				<img src={this.props.imgsrc} />
			</div>
			<h3>{this.props.title}</h3>
			<p>{this.props.profile}</p>
			<a href={this.props.alink}>{this.props.atxt}</a>
		</div>
	}
}

