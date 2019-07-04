import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import logo from '../../assets/images/logo.png'
import './slideLeft.less'
import menuList from '../../config/menuConfig' 
const { SubMenu } = Menu;

export default class App extends Component {
    // 运用 map 和 递归 将菜单栏展示出来
    getMenuNodes = (menuList) => {
        //不要忘了map 后 return 出去 不return 菜单列表压根就不显示
        return menuList.map((item, index) => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }else {
              return (
                <SubMenu
                key={item.key}
                title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu> 
              )
            }
        })
    }
    render() {
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理</h1>
                </Link>
                
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {/* 菜单栏里的item不应该写死 应该有一个专门的菜单栏配置 将数据动态渲染到菜单栏中 */}

                    {/* <Menu.Item key="1">
                        <Icon type="home" />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">品类管理</Menu.Item>
                        <Menu.Item key="6">商品管理</Menu.Item>
                    </SubMenu> */}
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        );
    }
}