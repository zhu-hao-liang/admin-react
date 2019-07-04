import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import './admin.less'
import SlideLeft from '../../components/slide/slideLeft'
const { Header, Footer, Sider, Content } = Layout
export default class Admin extends Component {
    render() {
        //如果用户没登录过，重定向登录页
        // 自动跳转到登陆(在render()中)
        if (!localStorage.getItem('loginId')) {
            return <Redirect to='/login' />
        }
        return (
            <Layout className='admin-layout'>
                <Sider>
                <SlideLeft />
                </Sider>
                <Layout>
                    <Header style={{backgroundColor: 'pink'}}>Header</Header>
                    <Content>Content</Content>
                    {/* <Footer style={{backgroundColor: 'red'}}>Footer</Footer> */}
                </Layout>
            </Layout>
        )
    }
}