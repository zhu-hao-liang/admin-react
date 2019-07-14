//将时间格式化
export function formatTime(date) {
   let Y = date.getFullYear() + '-';
   let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
   let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
   let h = (date.getHours() < 10 ? '0'+ (date.getHours()) : date.getHours()) + ':';
   let m = (date.getMinutes() < 10 ? '0'+ (date.getMinutes()) : date.getMinutes()) + ':';
   let s = date.getSeconds() < 10 ? '0'+ (date.getSeconds()) : date.getSeconds();
    return Y+M+D+h+m+s;
}
export const BASE_IMG_URL = 'http://localhost:5000/upload/' // 上传图片的基础路径