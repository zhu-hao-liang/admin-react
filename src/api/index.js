import Ajax from './ajax'
//基本要求: 能根据接口文档定义接口请求函数
export const login = (username, password) => Ajax('/login',{username,password},'post')