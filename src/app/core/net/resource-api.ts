/*
 * @Author: qiuziz
 * @Date: 2017-08-15 10:12:02
 * */

const API_HOST = '';
const SERVICE_NAME = '/api';

export const Resource: Object = {
  router: `${API_HOST}/menu`,
  login: `${API_HOST}/login`,

  // 账号管理
  account: `${API_HOST}${SERVICE_NAME}/user/:type`,

  // 权限组管理
  group: `${API_HOST}${SERVICE_NAME}/perm/:type`,


  // 角色管理
  role: `${API_HOST}${SERVICE_NAME}/role/:type`,


};

