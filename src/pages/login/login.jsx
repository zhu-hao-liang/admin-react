import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
 class Login extends Component {
    handleSubmit=(e) => {
        e.preventDefault();
        
    }
    render() {
        return (
            <div className="login">
            <header className="login-header">
              <img src={logo} alt="logo"/>
              <h1>React项目: 后台管理系统</h1>
            </header>
            <section className="login-content">
              <h2>用户登陆</h2>
            <Form onSubmit={this.handleSubmit} className="login-form" >
              <Form.Item className='password'>
        
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
        
        </Form.Item>
        <Form.Item className='password'>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
        </Form.Item>
        <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
        </Form.Item>
      </Form>
            </section>
          </div>
        )
    }
}
/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
const WrapLogin = Form.create()(Login)
//WrapLogin为包装组建（父组件） 内部包裹着Login组建,此时Login组建为子组件，包装组建（父组件）可以向被包装组建（子组件）传递属性
export default WrapLogin
