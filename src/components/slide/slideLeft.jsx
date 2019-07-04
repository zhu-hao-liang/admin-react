import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import logo from '../../assets/images/logo.png'
import './slideLeft.less'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
class menuNav extends Component {
    // 运用 map 和 递归 将菜单栏展示出来
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        //不要忘了map 后 return 出去 不return 菜单列表压根就不显示
        return menuList.map((item, index) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                //查找一个与当前路由匹配的子item
                const childItem = item.children.find((childItem, index) => childItem.key == path)
                if (childItem) {//如果存在 说明当前item的子列表需要打开
                    this.openKey = item.key
                }
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
    handleopenChange = () => {
        console.log('handleClick')
        //this.getMenuNodes(menuList)
    }
    /*
    在第一次render()之前执行一次
    为第一个render()准备数据(必须同步的)
   */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        // this.getMenuNodes(menuList)
        const path = this.props.location.pathname;
        const openKey = this.openKey
        console.log('openKey', openKey);
        //console.log('render()',path);
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    onClick={this.handleopenChange}
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
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件(可以看成包装成了一个路由组件)
新的组件向非路由组件传递3个属性: history/location/match
可以获取路由组件所拥有的属性
 */
export default withRouter(menuNav)