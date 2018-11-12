import { MockRequest, MockStatusError } from '@delon/mock';

const menu = {
  'menuButtonList': [
    {
      'link': '/system/account',
      'childButtonList': [
        {
          'buttonName': '新增',
          'buttonCode': 'bn_460',
        },
        {
          'buttonName': '修改',
          'buttonCode': 'bn_461',
        },
        {
          'buttonName': '启用',
          'buttonCode': 'bn_462',
        },
        {
          'buttonName': '停用',
          'buttonCode': 'bn_463',
        },
        {
          'buttonName': '修改密码',
          'buttonCode': 'bn_464',
        }
      ]
    },
  ],
  'menuList': [
    {
      'id': 19,
      'text': '系统管理',
      'group': true,
      'icon': 'sd-iconfont btn-icon-xtgl11',
      'children': [
        {
          'id': 59,
          'text': '账号管理',
          'link': '/system/account',
          'icon': 'sd-iconfont nav_system_account',
        },
        {
          'id': 60,
          'text': '权限组',
          'link': '/system/group',
          'icon': 'sd-iconfont nav_system_group',
        },
        {
          'id': 61,
          'text': '角色',
          'link': '/system/role',
          'icon': 'sd-iconfont nav_system_role',
        },
        {
          'id': 62,
          'text': '菜单按钮',
          'link': '/system/menuAndButtonSet',
          'icon': 'sd-iconfont nav_system_menu_set',
        },
        {
          'id': 64,
          'text': '系统缓存',
          'link': '/system/cache',
          'icon': 'sd-iconfont nav_system_cache',
        }
      ],
    },
  ]
};

const login = {
  resultCode: '0000',
  resultDesc: '成功,系统处理正常',
  success: true,
  data: {
    userName: 'qiuz'
  }
};


export const MENU = {
  'POST /menu': menu,
  'POST /login': login
};
