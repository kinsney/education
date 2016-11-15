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
            "image": "/media/banner/banner.png",
            "link": "http://www.baidu.com"
        },
        {
            "title": "ffff",
            "image": "/media/banner/banner_nMBIJmq.png",
            "link": "http://www.baidu.com"
        },
    ],
    "hotpots": 
    [
        {
            "title": "2017创客",
            "image": "/media/banner/hot1.png",
            "link": "http://www.baidu.com"
        },
        {
            "title": "2018创客活动",
            "image": "/media/banner/hot1_Kj5UXzx.png",
            "link": "http://www.baidu.com"
        },
    ],
    "categories": 
    [
        "ji-jie-gong-cheng": {
            "name": "机械工程",
            "lessons": [
                {
                    "name": "水电费",
                    "thumbnail": "/media/lessons/%E6%9C%BA%E6%A2%B0%E5%B7%A5%E7%A8%8B/%E6%B0%B4%E7%94%B5%E8%B4%B9/card6.png",
                    "link": "/LesCategories/ji-jie-gong-cheng/shui-dian-fei",
                    "price": "0.0",
                    "equipment": "小木片|单片机|铜电线",
                },
                {
                    "name": "方式",
                    "thumbnail": "/media/lessons/%E6%9C%BA%E6%A2%B0%E5%B7%A5%E7%A8%8B/%E6%96%B9%E5%BC%8F/card5.png",
                    "link": "/LesCategories/ji-jie-gong-cheng/fang-shi",
                    "price": "0.0",
                    "equipment": ['小木片','单片机','铜电线'],
                },
                {
                    "name": "发收到",
                    "thumbnail": "/media/lessons/%E6%9C%BA%E6%A2%B0%E5%B7%A5%E7%A8%8B/%E5%8F%91%E6%94%B6%E5%88%B0/card4.png",
                    "link": "/LesCategories/ji-jie-gong-cheng/fa-shou-dao",
                    "price": "0.0",
                    "equipment": ['小木片','单片机','铜电线'],
                },
                {
                    "name": "发斯蒂芬",
                    "thumbnail": "/media/lessons/%E6%9C%BA%E6%A2%B0%E5%B7%A5%E7%A8%8B/%E5%8F%91%E6%96%AF%E8%92%82%E8%8A%AC/card3.png",
                    "link": "/LesCategories/ji-jie-gong-cheng/fa-si-di-fen",
                    "price": "0.0",
                    "equipment": ['小木片','单片机','铜电线'],
                },
                {
                    "name": "十分钟",
                    "thumbnail": "/media/lessons/%E6%9C%BA%E6%A2%B0%E5%B7%A5%E7%A8%8B/%E5%8D%81%E5%88%86%E9%92%9F/card2.png",
                    "link": "/LesCategories/ji-jie-gong-cheng/shi-fen-zhong",
                    "price": "1.0",
                    "equipment": ['小木片','单片机','铜电线'],
                },
                {
                    "name": "十分钟教你快速制作一个跑酷机器人",
                    "thumbnail": "/media/lessons/%E6%9C%BA%E6%A2%B0%E5%B7%A5%E7%A8%8B/%E5%8D%81%E5%88%86%E9%92%9F%E6%95%99%E4%BD%A0%E5%BF%AB%E9%80%9F%E5%88%B6%E4%BD%9C%E4%B8%80%E4%B8%AA%E8%B7%91%E9%85%B7%E6%9C%BA%E5%99%A8%E4%BA%BA/card1.png",
                    "link": "/LesCategories/ji-jie-gong-cheng/shi-fen-zhong-jiao-ni-kuai-su-zhi-zuo-yi-ge-pao-ku-ji-qi-ren",
                    "price": "0.0",
                    "equipment": ['小木片','单片机','铜电线'],
                },
            ],
        },
        "ce-shi": {
            "name": "测试",
            "lessons": [],
        },
        "huan-shi-ce-shi": {
            "name": "还是测试",
            "lessons": [],
        }
    ],
    "activities": 
    [
        {
            "title": "收到",
            "video": "/media/activities/%E6%94%B6%E5%88%B0/110102104365andorid.mp4",
            "thumbnail": "/media/activities/%E6%94%B6%E5%88%B0/2.png",
        },
        {
            "title": "地方",
            "video": "/media/activities/%E5%9C%B0%E6%96%B9/110102104365andorid.mp4",
            "thumbnail": "/media/activities/%E5%9C%B0%E6%96%B9/2.png",
        },
    ]
}