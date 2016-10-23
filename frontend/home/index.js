import React from 'react';
import ReactDOM from 'react-dom';

export default class MyComponent extends React.Component 
{
	render() 
	{
		return <div> this is a this can be done </div>
	}
}

ReactDOM.render(<MyComponent/>, document.getElementById('home') );