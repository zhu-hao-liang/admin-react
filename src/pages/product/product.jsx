import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductHome from './product-home'
import ProductAdd from './product-add'
import ProductDetail from './product-detail'
import './product.less'

 class Product extends Component{
    render() {
      return (
        <Switch>
            <Route path='/product/home' component={ProductHome}></Route>
            <Route path='/product/detail' component={ProductDetail}></Route>
            <Route path='/product/add' component={ProductAdd}></Route>
            <Redirect to='/product/home' />
        </Switch>
      )
       
    }
}
export default Product