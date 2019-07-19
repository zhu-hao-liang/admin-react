import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Icon,
  Card,
  Cascader,
  Button

} from 'antd'
import { getCategorys } from '../../api'
import PicturesWall from './picture-wall'
const { TextArea } = Input;
// const options = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     isLeaf: false,//isLeaf 为false 表示有下一级分类 为 true 没有下一级分类
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     isLeaf: false,
//   },
//   {
//     value: 'jiangsu1',
//     label: 'Jiangsu1',
//     isLeaf: true,
//   },
// ];

class ProductAdd extends Component {
  static propTypes = {

  }
  state = {
    options: [],
  }
  getCategoryList = async (parentId) => {
    const res = await getCategorys(parentId)
    if (res.status === 0) {
      const category = res.data
      if (parentId == 0) {
        this.initOptions(category)
      } else {
        return category //async 函数返回值始终是一个promise对象,并且是成功状态(resolve(data))
      }

    }

  }
  loadData = async selectedOptions => {
    console.log(selectedOptions);//数组结构
    const targetOption = selectedOptions[selectedOptions.length - 1];//选中的一级分类(item)
    targetOption.loading = true;
    //将一级分类的_id作为二级分类的parentId查询二级分类列表
    const parentId = targetOption.value
    const subCategory = await this.getCategoryList(parentId)
    targetOption.loading = false;
    if (subCategory && subCategory.length) {//判断有没有chiidrn
      const subOptions = subCategory.map(item => (
        {
          label: item.name,
          value: item._id,
          isLeaf: true,
        }
      ))
      targetOption.children = subOptions
    }

    this.setState({
      options: [...this.state.options] //如果是对原有的state状态进行修改,(添加，修改，删除)，建议用[...array]这种方式
    })
    // setTimeout(() => {
    //   targetOption.loading = false;
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: 'dynamic1',
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: 'dynamic2',
    //     },
    //   ];
    //   this.setState({
    //     options: [...this.state.options],
    //   });
    // }, 5000);
  }
  //初始化一级分类
  initOptions = async (category) => {
    console.log(category)
    const options = category.map((item) => (
      {
        value: item._id,
        label: item.name,
        isLeaf: false,
      }
    ))
    //如果是二级分类修改的话
    const { pCategoryId } = this.product
    if (this.isUpdate && pCategoryId !== '0') {

      const subCategorys = await this.getCategoryList(pCategoryId)//通过pCategoryId查询二级分类
      const cOption = subCategorys.map(item => (
        {
          value: item._id,
          label: item.name,
          isLeaf: true,
        }
      ))
      const targetOption = options.find(item => item.value == pCategoryId)
      targetOption.children = cOption
    }
    this.setState({
      options
    })
  }
  /*
  验证价格的自定义验证函数
   */
  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value)
    if (value * 1 > 0) {
      callback() // 验证通过
    } else {
      callback('价格必须大于0') // 验证没通过
    }
  }
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }

    })
  }
  componentWillMount() {
    if (this.props.location.state) {
      const { product } = this.props.location.state
      this.isUpdate = true
      this.product = product
    } else {
      this.product = {}
    }
  }
  componentDidMount() {
    this.getCategoryList('0')
  }

  render() {

    const title = <div>
      <Icon type='arrow-left' style={{ fontSize: 20 }} />
      {this.isUpdate ? <span>修改商品</span> : <span>添加商品</span>}
    </div>
    const formItemLayout = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 8
      },
    }
    const { getFieldDecorator } = this.props.form
    const { pCategoryId, categoryId } = this.product
    const categorys = []
    if (pCategoryId == 0) {
      categorys.push(categoryId)
    } else {
      categorys.push(pCategoryId)
      categorys.push(categoryId)
    }
    return (
      <Card title={title} extra={''}>
        <Form className="addProductForm" {...formItemLayout}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: this.product.name,
              rules: [
                { required: true, message: '必须输入商品名称' }
              ]
            })(
              <Input
                placeholder="请输入商品名称"

              />
            )}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: this.product.desc,
              rules: [
                { required: true, message: '必须输入商品描述' }
              ]
            })(
              <TextArea autosize placeholder='请输入商品描述' />
            )}

          </Form.Item>
          <Form.Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: this.product.price,
                rules: [
                  { required: true, message: '必须输入商品价格' },
                  { validator: this.validatePrice }//自定义校验规则
                ]
              })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' min='0' />)
            }
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: categorys,
              rules: [
                { required: true, message: '必须指定商品分类' },
              ]
            })(
              <Cascader
                placeholder='请选择分类'
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
            )}

          </Form.Item>
          <Form.Item label='商品图片'>
            <PicturesWall />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(ProductAdd)