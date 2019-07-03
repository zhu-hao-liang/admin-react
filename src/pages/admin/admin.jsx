import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from 'antd'
export default class Admin extends Component {
    render() {
        //如果用户没登录过，重定向登录页
        // 自动跳转到登陆(在render()中)
        if(!localStorage.getItem('loginId')) {
           return <Redirect to='/login'/>
        }
        return (
            <div>
                <Button type='primary'>测试</Button>
            </div>
        )
    }
}