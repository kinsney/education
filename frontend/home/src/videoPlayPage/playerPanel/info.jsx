import React from 'react';

import { Row, Col, Carousel } from 'antd';
import BarTitle from '../title';
import TeachTool from '../teachTool/index';
import './style.less';

export default class VideoInfo extends React.Component
{
	render()
	{
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
			<Carousel vertical="true" slidesToShow={2}>
				<div className="toolRow"><Row gutter={24}>
      				<Col span="12"><TeachTool/></Col>
      				<Col span="12"><TeachTool/></Col>
    			</Row></div>

    			<div className="toolRow"><Row gutter={24}>
      				<Col span="12"><TeachTool/></Col>
      				<Col span="12"><TeachTool/></Col>
    			</Row></div>

    			<div className="toolRow"><Row gutter={24}>
      				<Col span="12"><TeachTool/></Col>
      				<Col span="12"><TeachTool/></Col>
    			</Row></div>
			</Carousel>
		</div>
	}
}