export class Context
{
	constructor()
	{
		this._context = {};
	}

	has(key) { return !!this._context[key]; }

	get(key,callback)
	{
		if (this.has(key)) return this._context[key];
		else return undefined;
	}

	init(context) { this._context = context; }
}


var context = new Context();
global.homeContext = context;
export default context;



const contextModle = 
{
    "carousels":
    [
        {
            "title": "测试",
            "image": "image/home/banner/1.png",
            "link": "http://www.baidu.com"
        },
        {
            "title": "ffff",
            "image": "image/home/banner/1.png",
            "link": "http://www.baidu.com"
        }
    ],
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
    ],
    "activities": 
    [
        {
            "title": "2017创客活动",
            "profile":"看得见啊是看得见风案例老师的，谁考得好交罚款，是打了打飞机是打发，是肯定会发离开家打发打发卡斯加大回复阿道",
            "video": "http://www.baidu.com",
            "thumbnail": "image/home/activity/1.png",
        },
        {
            "title": "沙发斯蒂芬",
            "profile":"看得见啊是看得见风案例老师的，谁考得好交罚款，是打了打飞机是打发，是肯定会发离开家打发打发卡斯加大回复阿道",
            "video": "http://www.baidu.com",
            "thumbnail": "image/home/activity/2.png",
        }
    ]
}