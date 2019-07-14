import React, { Component } from 'react'
import { Card, Input, Select, Button, Table, message } from 'antd'
import LinkButton from '../../components/link-button/link-button'
import {getProducts, reqUpdateStatus} from '../../api/index'
const { Option } = Select
//商品管理路由
export default class Home extends Component {
    state =  {
        products: [],
    }
    getProductList = async (pageNum, pageSize) => {
        this.pageNum = pageNum
        const res = await getProducts(pageNum, pageSize)
        if(res.status === 0) {
           this.setState({
               products: res.data.list,
               total: res.data.total
           })
        }
    }
    /*
  更新指定商品的状态
   */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if(result.status===0) {
      message.success('更新商品成功')
      this.getProductList(this.pageNum,5)
    }
  }
    componentDidMount() {
        this.getProductList(1,5)
    }
    render() {
        const {products, total} = this.state
        const title = (
            <div>
                <Select defaultValue="lucy" style={{ width: 170, marginRight: 30 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 170, marginRight: 10 }} />
                <Button type="primary" icon="serch">搜索</Button>
            </div>
        )
        const extra = (
            <Button type="primary" icon="plus">添加商品</Button>
        )
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (price) => '¥' + price  //当前指定了对应的属性(即声明了dataIndex), 传入的是对应的属性值,没有声明dataIndex,参数代表item
            },
            {
                title: '状态',
                // dataIndex: 'status', //当前指定了对应的属性(即声明了dataIndex), 传入的是对应的属性值,没有声明dataIndex,参数代表item
                key: 'status',
                width: 100,
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status===1 ? 2 : 1
                    return (
                      <span>
                        <Button
                          type='primary'
                          onClick={() => this.updateStatus(_id, newStatus)}
                        >
                          {status===1 ? '下架' : '上架'}
                        </Button>
                        <span>{status===1 ? '在售' : '已下架'}</span>
                      </span>
                    )
                  }
            },
            {
                title: '操作',
                key: 'action',
                width: 100,
                render: (product) => (
                    <span>
                    {/*将product对象使用state传递给目标路由组件*/}
                    <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
                    <LinkButton>修改</LinkButton>
                  </span>
                ),
            },

        ];
        return (
            <Card title={title} extra={extra}>
                <Table 
                dataSource={products}
                 columns={columns} 
                 bordered 
                 pagination={{
                    current: this.pageNum,
                    total,
                    defaultPageSize: 5,
                    showQuickJumper: true,
                    // onChange: (value) => {
                    //     this.getProductList(value,5)
                    // }
                    onChange: this.getProductList
                  }}
                 />
            </Card>
        )
    }
}