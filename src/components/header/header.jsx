import React , {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Modal} from 'antd'
import {formatTime} from '../../utils/utils'
import './header.less'
import menuList from '../../config/menuConfig'
class Header extends Component {
   state = {
    currentDate: formatTime(new Date())
   }
   //退出
   loginOut = () => {
    Modal.confirm({
        title: '提示',
        content: '确定退出吗',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          localStorage.clear()
          this.props.history.push('/login')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      
   }
   //每次切换路由的的时候切换标题
   getTitle = (menuList) => {
       //获取当前路由的路径 注意 header组件并不是路由组件 是通过withRoute包装后才能获取路由属性
       const path = this.props.location.pathname;
       let title;
       menuList.forEach((item,index) => {//foreach方法不能再内部return 返回值始终未undefined
           if(!item.children) {
              if(item.key === path) {
                  title= item.title
              }
           }else {
           const citem = item.children.find(citem =>citem.key === path);
            //如果存在子item才说明有匹配的
           if(citem) {
            title = citem.title
           }
          
           }
       })
       return title
   }
   componentDidMount() {
       this.timer = setInterval(() => {
        const currentDate = formatTime(new Date());
         this.setState({
            currentDate
         })
       },1000)
   }
   //组件销毁之前清空定时器
   componentWillUnmount() {
       clearInterval(this.timer)
   }
    render() {
        const {currentDate} = this.state
        //每次render的时候切换标题
        const title = this.getTitle(menuList)
        return (
            <div className='headerContainer'>
                <div className="headerContainerTop">
                    <div className="headerContainerTopContent">
                        <span>欢迎{' '}{localStorage['username']}</span>
                        <a className='loginout' onClick={this.loginOut}>退出</a>
                    </div>
                </div>
                <div className="headerContainerBottom">
                    <span>{title}</span>
                    <div className=''>
                        <span>{currentDate}</span>
                        <img src="" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)