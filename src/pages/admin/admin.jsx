import React, { Component } from 'react'
import { Switch, Route, Redirect, } from 'react-router-dom'
import { Layout } from 'antd'
import './admin.less'
import SlideLeft from '../../components/slide/slideLeft'
import Home from '../../pages/home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Role from '../role/role'
import Order from '../order/order'
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
                    <Header style={{ backgroundColor: 'pink' }}>Header</Header>
                    <Content>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/user' component={User} />
                            <Route path='/role' component={Role} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/order" component={Order} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    {/* <Footer style={{backgroundColor: 'red'}}>Footer</Footer> */}
                </Layout>
            </Layout>
        )
    }
}