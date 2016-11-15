/*--创建初始state----------------------------------------*/
var initialState = 
{
	isLogin: false
}


/*--创建action----------------------------------------*/
// 登录
export function login() 
{
	return {type:"Sign",true};
}
// 登出
export function logout() 
{
	return {type:"Sign", false };
}


/*--创建reducer----------------------------------------*/
export default function auth(state=initialState, action=null)
{
	switch(action.type)
	{
		case "Sign" : 
			let newState = Object.assign({}, state);
	}
}