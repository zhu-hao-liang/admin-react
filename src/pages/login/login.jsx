import React,{Component} from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import {login} from '../../api/index'
 class Login extends Component {
    handleSubmit=(e) => {
        e.preventDefault();
        //再次进行统一校验
        this.props.form.validateFields((err,values) => {
          if(!err) {
           console.log(values);
           //校验通过的话发送ajax请求
           const {username, password} = values
           login(username,password).then(res => {
              //console.log(res);
              if(res.status === 0) {
                 const loginId = res.data._id;//登录成功标志
                 const {username} = res.data
                 localStorage.setItem('loginId',loginId)
                 localStorage.setItem('username',username)
                 message.success('登录成功',1);
                 this.props.history.replace('/')

              }
           })
          }
        })
        
    }
    //自定义校验规则
    _validator =  (rule, value, callback) => {
      console.log('_validator()',value)
      //callback()直接调用表示严正通过 直接放行  callback('xxx') 表示不通过，xxx为错误信息
      if(!value.trim()) {
         callback('密码为必填项!')
      }else if(value.length <= 4) {
        callback('密码不少于四位!')
      }else if(value.length > 8) {
        callback('密码不多于八位!')
      }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
        callback('密码必须是英文、数字或下划线组成!')
      }else {
        callback()
      }
    }
    render() {
      const {getFieldDecorator} = this.props.form
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
                {getFieldDecorator('username',{//username注册标识符
                     rules: [
                       { required: true, message: '用户名为必填项!' },
                       { min: 4, message: '用户名不少于四位'},
                       { max: 8, message: '用户名不多于八位'},
                       { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                    ],
                })( <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />)}
        
           
        
        </Form.Item>
        <Form.Item className='password'>
          {getFieldDecorator('password',{
             rules: [
               {validator: this._validator}
             ]
          })( <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />)}
           
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
