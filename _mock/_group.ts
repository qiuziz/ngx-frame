import { MockRequest, MockStatusError } from '@delon/mock';

const userList = {
  resultCode: '0000',
  resultDesc: '成功,系统处理正常',
  success: true,
  totalCount: 12,
  userBean: null,
  userBeanList: [
    {
      bindingIp: '',
      createDate: '2018-10-19 16:27:02',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-10-19 16:27:02',
      id: 133,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '1',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '123',
      roleName: '客服',
      state: '1',
      updateDate: '2018-10-19 16:52:17',
      updateDateStr: null,
      updateDateString: '2018-10-19 16:52:17',
      userName: 'zhangjingjing',
      accountName: 'zhangjingjing'
    },
    {
      bindingIp: '',
      createDate: '2018-09-19 16:36:10',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-19 16:36:10',
      id: 132,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '124',
      roleName: '内部测试角色',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null,
      userName: 'whisper',
      accountName: 'whisper'
    },
    {
      bindingIp: '',
      createDate: '2018-09-18 14:16:38',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-18 14:16:38',
      id: 131,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '1',
      nickName: 'qiuz',
      operator: null,
      password: 'O86Dpo3WftkuNaqsR/i80w==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '127',
      roleName: 'bbB',
      state: '1',
      updateDate: '2018-09-20 16:58:59',
      updateDateStr: null,
      updateDateString: '2018-09-20 16:58:59',
      userName: 'qiuz',
      accountName: 'qiuz'
    },
    {
      bindingIp: '',
      createDate: '2018-09-17 17:17:02',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-17 17:17:02',
      id: 130,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'JsO1CaQNexaEDY72JKprIA==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '123',
      roleName: '客服',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null,
      userName: 'mm',
      accountName: 'mm',
    },
    {
      bindingIp: '',
      createDate: '2018-09-17 17:16:57',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-17 17:16:57',
      id: 129,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '123',
      roleName: '客服',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null,
      userName: 'ceshi123456',
      accountName: 'ceshi123456',
    },
    {
      bindingIp: '',
      createDate: '2018-09-17 17:16:44',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-17 17:16:44',
      id: 128,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '124',
      roleName: '内部测试角色',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null,
      userName: 'liqian',
      accountName: 'liqian',
    },
    {
      bindingIp: '',
      createDate: '2018-09-17 17:16:05',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-17 17:16:05',
      id: 127,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '127',
      roleName: 'bbB',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null,
      userName: 'ceshitest',
      accountName: 'ceshitest',
    },
    {
      bindingIp: '',
      createDate: '2018-09-15 14:50:56',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-15 14:50:56',
      id: 126,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: 'sd',
      roleCode: '1',
      roleName: '超级管理员',
      state: '1',
      updateDate: '2018-09-15 14:52:16',
      updateDateStr: null,
      updateDateString: '2018-09-15 14:52:16',
      userName: 'ssdltest_0915',
      accountName: 'ssdltest_0915',
    },
    {
      bindingIp: '',
      createDate: '2018-09-15 14:48:51',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-15 14:48:51',
      id: 125,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'VnxQXbpx/xaRkRT3R0sChQ==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '127',
      roleName: 'bbB',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null,
      userName: 'sdceshi',
      accountName: 'sdceshi',
    },
    {
      bindingIp: '',
      createDate: '2018-09-15 14:34:55',
      createDateEndString: null,
      createDateStr: null,
      createDateString: '2018-09-15 14:34:55',
      id: 124,
      isFirstLanding: null,
      isNetworkPerm: '0',
      loginState: '0',
      nickName: 'qiuz',
      operator: null,
      password: 'oCymaTWxcTM+FfBZ1wtudg==',
      permGroupCode: 'sd',
      permName: '内部权限组',
      remark: '',
      roleCode: '127',
      roleName: 'bbB',
      state: '1',
      updateDate: '2018-09-15 14:39:00',
      updateDateStr: null,
      updateDateString: '2018-09-15 14:39:00',
      userName: 'lxxdyffg',
      accountName: 'lxxdyffg',
    }
  ]
};

function findData(data, index, params) {
  const keys = Object.keys(params);
  let result = data[index];
  console.log(result);
  if (keys.length > 0) {
    keys.forEach(key => {
      if (params[key]) {
        result = result.filter(item => item[key] === params[key]);
      }
    });
  }
  return {
    [index]: result,
    resultCode: '0000',
    resultDesc: '成功,系统处理正常',
    success: true,
    totalCount: 12,
  };
}
function findDataForId(data, params, key = 'id') {
  console.log(params);
  const id = params[key] || '';
  let result = {};
  data.forEach(item => {
    if (item[key] && item[key].toString() === id) {
      result = item;
    }
  });
  return result;
}

const permGroup = {
  permissionGroupBean: null,
  permissionGroupBeanList: [
    {
      createDate: '2018-08-10 11:42:52',
      createDateEndStr: null,
      createDateStr: '2018-08-10 11:42:52',
      id: 77,
      permCode: 'sd',
      permName: '内部权限组',
      remark: '内部权限组，指定唯一',
      state: '1',
      updateDate: '2018-08-14 16:14:47',
      updateDateStr: '2018-08-14 16:14:47'
    }
  ],
  resultCode: '0000',
  resultDesc: '成功,系统处理正常',
  success: true,
  totalCount: null
};

const roleList = {
  resultCode: '0000',
  resultDesc: '成功,系统处理正常',
  roleList: [
    {
      createDate: null,
      createDateStr: null,
      createDateString: '2018-09-18 13:48:39',
      dataList: null,
      id: null,
      menuList: null,
      permCode: 'sd',
      permName: null,
      remark: null,
      roleCode: '127',
      roleName: 'bbB',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null
    },
    {
      createDate: null,
      createDateStr: null,
      createDateString: '2018-09-18 13:48:39',
      dataList: null,
      id: null,
      menuList: null,
      permCode: 'sd',
      permName: null,
      remark: null,
      roleCode: '123',
      roleName: '客服',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null
    },
    {
      createDate: null,
      createDateStr: null,
      createDateString: '2018-09-18 13:48:39',
      dataList: null,
      id: null,
      menuList: null,
      permCode: 'sd',
      permName: null,
      remark: null,
      roleCode: '124',
      roleName: '内部测试角色',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null
    },
    {
      createDate: null,
      createDateStr: null,
      createDateString: '2018-09-18 13:48:39',
      dataList: null,
      id: null,
      menuList: null,
      permCode: 'sd',
      permName: null,
      remark: null,
      roleCode: '1',
      roleName: '超级管理员',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null
    },
    {
      createDate: null,
      createDateStr: null,
      createDateString: '2018-09-18 13:48:39',
      dataList: null,
      id: null,
      menuList: null,
      permCode: 'sd',
      permName: null,
      remark: null,
      roleCode: '2',
      roleName: '调度',
      state: '1',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null
    },
    {
      createDate: null,
      createDateStr: null,
      createDateString: '2018-09-18 13:48:39',
      dataList: null,
      id: null,
      menuList: null,
      permCode: 'sd',
      permName: null,
      remark: null,
      roleCode: '129',
      roleName: '预发布角色',
      state: '0',
      updateDate: null,
      updateDateStr: null,
      updateDateString: null
    },
  ],
  success: true,
  totalCount: null
};

function findRoleList(params: any, type: string) {
  if (type === 'find' && !params.permCode) {
    return {
      roleList: []
    };
  }
  return roleList;
}

const permGroupList = {
  permissionGroupBean: null,
  permissionGroupBeanList: [
    {
      createDate: '2018-09-18 14:10:08',
      createDateEndStr: null,
      createDateStr: '2018-09-18 14:10:08',
      id: 78,
      permCode: '78',
      permName: '内部测试权限组',
      remark: '',
      state: '1',
      updateDate: null,
      updateDateStr: null
    },
    {
      createDate: '2018-08-10 11:42:52',
      createDateEndStr: null,
      createDateStr: '2018-08-10 11:42:52',
      id: 77,
      permCode: 'sd',
      permName: '内部权限组',
      remark: '权限组，指定唯一',
      state: '1',
      updateDate: '2018-09-17 19:39:25',
      updateDateStr: '2018-09-17 19:39:25'
    },
    {
      createDate: '2018-01-22 15:57:50',
      createDateEndStr: null,
      createDateStr: '2018-01-22 15:57:50',
      id: 1,
      permCode: 'admin',
      permName: '超级管理员',
      remark: '该权限组唯一，拥有查询全部数据权限',
      state: '1',
      updateDate: '2018-04-10 19:46:16',
      updateDateStr: '2018-04-10 19:46:16'
    }
  ],
  resultCode: '0000',
  resultDesc: '成功,系统处理正常',
  success: true
};

export const GROUP = {
  'POST /api/perm/getPermGroup': permGroup,
  'POST /api/perm/listPermGroup': (req: MockRequest) => findData(permGroupList, 'permissionGroupBeanList', JSON.parse(req.body)),
  'POST /api/role/getRoleByPerm': (req: MockRequest) => findRoleList(JSON.parse(req.body), 'find'),
  'POST /api/role/getRoleList': (req: MockRequest) => findRoleList(JSON.parse(req.body), 'get'),
  'POST /api/user/getUserList': (req: MockRequest) => findData(userList, 'userBeanList', JSON.parse(req.body)),
  'POST /api/user/getUserInfo/:id': (req: MockRequest) => findDataForId(userList.userBeanList, req.params),
  'POST /api/perm/getPermGroup/:id': (req: MockRequest) => findDataForId(permGroupList.permissionGroupBeanList, req.params)
};
