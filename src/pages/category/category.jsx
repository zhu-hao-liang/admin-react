import React, { Component } from 'react'
import { Card, Icon, Table, Button, Modal, } from 'antd'
import AddForm from './add-form'
import UpdateForm from './update-form'
import './category.less'
import { getCategorys, addCategory, updateCategory } from '../../api/index'
import LinkButton from '../../components/link-button/link-button'
// 品类管理路由
export default class Category extends Component {
    state = {
        categorys: [],
        parentId: '0',
        name: '',
        loading: false,
        visibleAdd: false,
        visibleUpdate: false,
    }
    //隐藏modal框
    hideModal = () => {
        console.log('onCancel');
        this.setState({
            visibleAdd: false,
            visibleUpdate: false,
        })
    }
    //查看子分类
    lookSubCategoy = (category) => {
        //category为数组里的item
        console.log('lookSubCategoy', category)
        const parentId = category._id
        const name = category.name
        this.getAllCategory(parentId, name)
    }
    //返回一级分类
    backCategory = () => {
        this.getAllCategory('0', null)
    }
    //封装查询分类方法
    getAllCategory = (parentId, name) => {
        this.setState({
            loading: true,
        })
        parentId = parentId || this.state.parentId
        getCategorys(parentId).then(res => {
            this.setState({
                loading: false,
            })
            if (res.status == 0) {
                const categorys = res.data;
                if(parentId == 0){
                    this.notSubCategorys = categorys
                }
                this.setState({
                    categorys,
                    parentId,
                    name
                })

            }
        })
    }
    //修改
    updateCategory = (category) => {
        console.log(category.name);
        //存储分类名 传给子组件
        this.categoryName = category.name
        this.categoryId = category._id
        this.setState({
            visibleUpdate: true,
        })

    }
    //确认修改
    updateCategoryOk = async () => {
        const categoryId = this.categoryId;
        const categoryName = this.form.getFieldValue('categoryName')
        const res = await updateCategory(categoryId, categoryName)
        if (res.status == 0) {
            // 更新成功之后务必 清除输入框的数据，不然会有bug
            this.form.resetFields()
            this.setState({
                visibleUpdate: false
            })
            this.getAllCategory()
        }
    }
    //添加分类
    showAdd = () => {
        this.setState({
            visibleAdd: true,
        })
    }
    //确认添加
    addCategoryOk= async () => {
        const categoryName = this.form.getFieldValue('categoryName')
        const parentId = this.form.getFieldValue('parentId')
        const res = await addCategory(categoryName,parentId)
        if(res.status == 0) {
            this.getAllCategory('0')
            this.setState({
                visibleAdd: false
            })
        }
    }
    componentDidMount() {
        this.getAllCategory()
    }
    render() {
        console.log('render')
        const { categorys, parentId, name, loading } = this.state;
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: '_id',
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                //table里操作按钮里render函数参数为当前行里的所有数据 可以理解为一个item
                render: (category) => (
                    <span className='categoryAction'>
                        <LinkButton onClick={() => this.updateCategory(category)}>修改分类</LinkButton>
                        {parentId == 0 ? <LinkButton onClick={() => this.lookSubCategoy(category)}>查看子分类</LinkButton> : ''}
                    </span>

                ),
            },
        ];
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus' />
                添加
            </Button>
        )
        const title = parentId == 0 ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.backCategory}>一级分类列表</LinkButton>
                <Icon type='arrow-right' style={{ marginRight: 5 }} />
                <span>{name}</span>
            </span>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table dataSource={categorys}
                        columns={columns}
                        bordered
                        loading={loading}
                        rowKey={categorys._id}
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />
                </Card>


                {/* 新增 */}
                <Modal
                    title="新增分类"
                    visible={this.state.visibleAdd}
                    onOk={this.addCategoryOk}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <AddForm categorys={this.notSubCategorys} parentId={this.state.parentId} getAddForm={form => this.form = form}/>
                   
                </Modal>
                {/* 修改 */}
                <Modal
                    title="修改分类"
                    visible={this.state.visibleUpdate}
                    onOk={this.updateCategoryOk}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <UpdateForm categoryName={this.categoryName} getForm={form => this.form = form} />
                </Modal>
            </div>
        )

    }
}