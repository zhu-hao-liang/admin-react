import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Option = Select.Option
 class AddForm extends Component{
   
    render() {
        const { getFieldDecorator } = this.props.form
        const {categorys,parentId,getAddForm} = this.props
        getAddForm(this.props.form)
        return (
            <Form>
            <Form.Item>
            {getFieldDecorator('parentId',{
               initialValue: parentId
            })(
                  <Select>
                  <Option value="0">一级分类</Option>
                  {categorys.map((item,index) => (<Option value={item._id}>{item.name}</Option>))}
                  </Select>
            )}
              
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('categoryName')(
                     <Input
                     placeholder="请输入分类名称"
                 />
                )}
               
            </Form.Item>

        </Form>
        )
    }
}
export default Form.create()(AddForm)