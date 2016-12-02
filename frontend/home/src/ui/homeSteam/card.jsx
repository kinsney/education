import React from 'react';

export default class Card extends React.Component
{
	render()
	{
		return <div className="card">
			<div className="logo">
				<img src={this.props.imgsrc} />
			</div>
			<h2>{this.props.title}</h2>
			<p>{this.props.profile}</p>
			<a href={this.props.alink}>{this.props.atxt}</a>
		</div>
	}
}

