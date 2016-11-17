import React from 'react';

import { Row, Col, Tabs, Icon} from 'antd';
const TabPane = Tabs.TabPane;

import './style.less';
import HotCard from './hotCard';
import Card from './card';

import context from 'home/../index';

export default class Course extends React.Component
{
	data = {
		hotpots:
	    [
	        {
	            "title": "2017创客",
	            "date" : "2016年12月12日",
	            "image": "image/home/course/hot1.png",
	            "link": "http://www.baidu.com"
	        },
	        {
	            "title": "2017创客",
	            "date" : "2016年12月12日",
	            "image": "image/home/course/hot1.png",
	            "link": "http://www.baidu.com"
	        },
	    ],
	    categories:
	    [
	    	{
	    		title:"航模及无人机",more:"http://www.baidu.com",
	    		lessons:[
	    			{
	    				"title": "1十分钟教你制作一个超级炫酷的跑酷机器人",
				        "thumbnail": "image/home/course/card2.png",
				        "link": "http://www.baidu.com",
				        "price": 0,
				        "time" : "10:08",
				        "equipment": "卡斯大|上的法|三大|是打发"
				    },
	    			{
	    				"title": "2十分钟教你制作一个超级炫酷的跑酷机器人",
				        "thumbnail": "image/home/course/card2.png",
				        "link": "http://www.baidu.com",
				        "price": 0,
				        "time" : "10:08",
				        "equipment": "卡斯大|上的法|三大|是打发"
				    },
				    {
	    				"title": "3十分钟教你制作一个超级炫酷的跑酷机器人",
				        "thumbnail": "image/home/course/card2.png",
				        "link": "http://www.baidu.com",
				        "price": 0,
				        "time" : "10:08",
				        "equipment": "卡斯大|上的法|三大|是打发"
				    },
				    {
	    				"title": "4十分钟教你制作一个超级炫酷的跑酷机器人",
				        "thumbnail": "image/home/course/card2.png",
				        "link": "http://www.baidu.com",
				        "price": 0,
				        "time" : "10:08",
				        "equipment": "卡斯大|上的法|三大|是打发"
				    },
	    		]
	    	},
	    	{
	    		title:"机械工程",more:"http://www.360.com",
	    		lessons:[]
	    	}
	    ]
	};

	state = {
		nowIndex:0,
	};

	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
		this.checkState = this.checkState.bind(this);
	}
	componentWillMount()
	{
		var categories = context.get("categories");
		var hotpots = context.get("hotpots");
		if (hotpots&&categories)
		{
			this.data.categories = categories;
			this.data.hotpots = hotpots;
		}
	}
	changeTab(index)
	{
		// console.log(index);
		this.setState({nowIndex:index});
	}
	checkState(){ console.log("state:",this.state); }
	render()
	{
		var categories = this.data.categories;
		var hotpots = this.data.hotpots;

		var TabPanes = categories.map((item,index)=>{
			return <TabPane tab={item.title} key={index}>
				<Row gutter={24}>
					{item.lessons.slice(0,3).map((lesseon,index)=>{
						return <Col key={index} span={8}><Card itemdata={lesseon}/></Col>
					})}
				</Row>
				<div style={{height:'20px'}}></div>
				<Row gutter={24}>
					{item.lessons.slice(3).map((lesseon,index)=>{
						return <Col key={index} span={8}><Card  itemdata={lesseon}/></Col>
					})}
				</Row>
			</TabPane>
		});

		var tabMore = <div className="more">
			<a href={categories[this.state.nowIndex].more}>更多&nbsp;<Icon type="right-circle-o"/></a>
		</div>

		return <div className="crossCourse"><div className="crossCont">
			<Row gutter={24}>
				<Col span={6}>
					<div className="hotTop"><h1 onClick={this.checkState}>热门公开课</h1></div>
					<div className="hotDown"> <HotCard itemdata={hotpots}/> </div>
				</Col>
				<Col span={18}>
					<Tabs onChange={this.changeTab}
						tabBarExtraContent={tabMore}
						activeKey={this.state.nowIndex+''} >
						{TabPanes}
					</Tabs>
				</Col>
			</Row>
		</div> </div>
	}
}
