import React from 'react';

import Boxin from './Boxin';
import Boxout from './Boxout';

import './style.less';


export default class LoginBox extends React.Component
{
	
	static propTypes = { 
		isLogin: React.PropTypes.bool.isRequired,
	};
	static defaultProps = { 
		isLogin: false,
	};

	render()
	{
		var BOXIN = <Boxin/>;
		var BOXOUT = <Boxout/>;

		return <div className="loginBox">
			{ this.props.isLogin ? BOXOUT : BOXIN }
		</div>
	}
}