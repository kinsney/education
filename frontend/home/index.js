import React from 'react';
import ReactDOM from 'react-dom';

import { Steps } from 'antd';
const Step = Steps.Step;

module.hot.accept();


export default class HomePage extends React.Component
{
	render()
	{
		return <div>
			<h2>sdhalfkajs</h2>
			<Steps current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
		</div>
	}
}
ReactDOM.render(<HomePage/>, document.getElementById('home') );
