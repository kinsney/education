import React from 'react';

import { Row, Col, Carousel } from 'antd';

import BarTitle from '../title';
import TeachTool from '../teachTool/index';
import Loader from 'home/../Loader';
import './style.less';

export default class VideoInfo extends React.Component
{
	data = {
		devices: 
		[
	        { name: "电子包", description: "这是描述", icon: "image/video/arduino.png" },
	        { name: "Arduno", description: "这是描述", icon: "image/video/arduino.png" },
	    ]
	};

	componentWillMount()
	{
		var devices = Loader.get("devices");
		if(devices) this.data.devices = devices;
	}
	render()
	{
		var devices = this.data.devices;
		var TeachTools = [];

		for(let i=0; i<devices.length; i+=2)
		{
			if((i+1)==devices.length)
			{
				let ele = <div className="toolRow"><Row gutter={24}>
      				<Col span="12"><TeachTool {...devices[i]}/></Col>
    			</Row></div>;
				TeachTools.push(ele);
			}
			else
			{
				let ele = <div className="toolRow"><Row gutter={24}>
      				<Col span="12"><TeachTool  {...devices[i]}/></Col>
      				<Col span="12"><TeachTool  {...devices[i+1]}/></Col>
    			</Row></div>;
				TeachTools.push(ele);
			}
		}

		return <div className="videoInfo">
			<BarTitle title="创客老师"/>
			<div className="geekTeacher"><Row>
				<Col span={8}>
					<img src={require('./img/teacher.png')}/>
				</Col>
				<Col span={16}>
					<h5>显卡圣诞</h5>
					<p>是可敬的阿萨德交罚款的积分卡带机发电房，谁考得好阿卡剪短发说的</p>
				</Col>
			</Row></div>
			
			<BarTitle title="教具清单"/>
			<Carousel vertical="true" slidesToShow={2} draggable={false} infinite={false}>
				{TeachTools}
			</Carousel>
		</div>
	}
}