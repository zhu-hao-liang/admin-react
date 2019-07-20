import ajax from './ajax'
//基本要求: 能根据接口文档定义接口请求函数
export const login = (username, password) => ajax('/login',{username,password},'post')
// 获取一级/二级分类的列表
export const getCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// 添加分类
export const addCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
// 更新分类
export const updateCategory = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')
// 获取商品分页列表
export const getProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')
// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')