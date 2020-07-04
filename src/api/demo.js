/**
 * tag模块接口列表
 */

import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs';
import da from "element-ui/src/locale/lang/da"; // 根据需求是否导入qs模块

const demo = {
  list() {
    return axios.get('/qsqgk');
  },
  add(data) {
    return axios.post('/qsqgk',data);
  }
};
export default demo;
