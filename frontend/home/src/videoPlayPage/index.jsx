import React from 'react';

import { Row, Col } from 'antd';

import PlayerPanel from './playerPanel/index';
import ClassProfile from './classProfilePanel/index';
import GuessYouLike from './guessYouLikePanel/index';

import './style.less';

export default class PlayPage extends React.Component
{
	render()
	{
		return <div className="playPage"><div>
			<PlayerPanel />
			<Row gutter={24}>
				<Col span={18}>
					<ClassProfile />
				</Col>
				<Col span={6}>
					<GuessYouLike />
				</Col>
			</Row>
			<div style={{height:32}}></div>
		</div></div>
	}
}