import React from 'react';
import ReactDOM from 'react-dom';
alert("123")
export default class MyComponent extends React.Component
{
	render()
	{
		return <div> this is a this can be done </div>
	}
}

ReactDOM.render(<MyComponent/>, document.getElementById('home') );
