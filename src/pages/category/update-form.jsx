import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

 class UpdataForm extends Component{
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        getForm: PropTypes.func.isRequired
      }
    render() {
        const {categoryName,getForm,form} = this.props;
        const { getFieldDecorator } = this.props.form
        getForm(form)
        return (
            <Form>
            <Form.Item>
           { getFieldDecorator('categoryName',{
               initialValue: categoryName,
               rules: [{ required: true, message: '分类名称为必填项!' },]
           })(  <Input
                    placeholder="请输入分类名称"
                />)}
              
            </Form.Item>

        </Form>
        )
    }
}
export default Form.create()(UpdataForm)