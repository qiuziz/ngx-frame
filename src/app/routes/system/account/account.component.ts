/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-19 11:50:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-02 16:24:07
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '@core/net/http.service';
import { STColumn, STChange, STComponent, STPage } from '@delon/abc';
import { Router } from '@angular/router';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NavigateService } from '@common/navigate.service';
import { dateFormat } from '@common/multi-platform-date';

@Component({
  selector: 'app-system-account',
  styleUrls: ['./account.component.less'],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  @ViewChild('st') comp: STComponent;
  confirmModal: NzModalRef;
  permissionGroupBeanList = [];
  queryParams = {
    pageNum: 1,
    pageSize: 10,
    total: 100
  };
  searchBoxOpts = {
    queryParams: this.queryParams,
    conditions: [
      {
        label: '账号名称',
        type: 'string',
        placeholder: '请输入账号名称',
        queryIndex: 'accountName'
      },
      {
        label: '账号状态',
        type: 'select',
        queryIndex: 'state',
        data: [
          { name: '启用', value: '1' },
          { name: '停用', value: '0' }
        ]
      },
      {
        label: '所属权限组',
        type: 'select',
        queryIndex: 'permGroupCode',
        value: 'permCode',
        name: 'permName',
        data: this.permissionGroupBeanList
      },
      {
        label: '创建时间',
        type: 'dateRange',
        range: ['createDateString', 'createDateEndString']
      }
    ],
    buttonList: [
      { buttonName: '查询', type: 'blue', query: true, click: queryParams => this.search(queryParams) },
      { buttonName: '重置', type: 'green', reset: true }
    ]
  };
  users: any[] = [];
  select: any = {};
  columns: STColumn[] = [
    {
      title: '',
      index: 'id',
      type: 'radio'
    },
    {
      title: '账户ID',
      width: '70',
      index: 'id'
    },
    {
      title: '账户名称',
      width: '100',
      index: 'userName'
    },
    {
      title: '昵称',
      width: '100',
      index: 'nickName'
    },
    {
      title: '所属权限组',
      width: '150',
      index: 'permName'
    },
    {
      title: '所含角色',
      width: '100',
      index: 'roleName'
    },
    {
      title: '创建时间',
      width: '150',
      index: 'createDateString'
    },
    {
      title: '修改时间',
      width: '150',
      index: 'updateDateString'
    },
    {
      title: '外网权限',
      width: '70',
      index: 'isNetworkPerm',
      render: 'isNetworkPerm'
    },
    {
      title: '已绑定IP',
      width: '100',
      index: 'bindingIp'
    },
    {
      title: '账号状态',
      width: '70',
      index: 'state',
      render: 'state'
    },
    {
      title: '备注',
      width: '100',
      index: 'remark'
    }
  ];

  constructor(
    private httpService: HttpService,
    private router: Router,
    private modal: NzModalService,
    private navigate: NavigateService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.httpService.post('group', { type: 'getPermGroup' }, {}).subscribe((res: any) => {
      Object.assign(this.permissionGroupBeanList, res.permissionGroupBeanList);
    });
    this.getUserList();
  }

  change(e: STChange) {
    console.log(e);
    if (e.type === 'radio') {
      this.select = e.radio;
    }

    if (e.type === 'pi') {
      this.queryParams.pageNum =  e.pi;
      this.getUserList(this.queryParams);
    }
  }

  getUserList(queryParams = {}): void {
    this.httpService.post('account', { type: 'getUserList' }, queryParams).subscribe((res: any) => {
      console.log(res);
      this.users = res.userBeanList;
      this.queryParams.total = res.totalCount;
    });
  }

  search(queryParams: any = {}) {
    console.log(queryParams);
    this.getUserList(queryParams);
  }

  clickBtn = (buttonName) => {
    if (!this.select.id && buttonName !== '新增') {
      return this.message.error('请选择一个账号');
    }
    console.log(buttonName);
    switch (buttonName) {
      case '新增':
        this.accountCreateOrEdit('create');
        break;

      case '修改':
        this.accountCreateOrEdit('update');
        break;

      case '启用':
        this.updateUserState('1');
        break;

      case '停用':
        this.updateUserState('0');
        break;

      case '修改密码':
        this.accountCreateOrEdit('updatePwd');
        break;

      default:
        break;
    }
  }

  accountCreateOrEdit(type, data = {}) {
    const params = type === 'create' ? {} : { data: this.select };
    this.navigate.stateGo(`/system/account/${type}`, params);
  }

  /**
	 * @description 修改账号状态
	 */
  updateUserState(type) {
    if (!this.select.id) {
      this.message.error('请选择一个账号');
      return;
    }
    const option = `${type === '1' ? '启用' : '停用'}`;
    if (this.select.state === type) {
      this.message.error(`该账号已${option}`);
      return;
    }
    this.showConfirm({
      title: `确定${option}${this.select.userName}吗？`,
      onOk: () => this.httpService.post('account', { type: 'updateUserState' }, { state: type, id: this.select.id }).subscribe(res => {
        this.message.success(`${option}成功`);
        this.getUserList();
      })
    });
  }


  showConfirm(options): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: options.title,
      nzContent: options.content,
      nzOnOk: () => options.onOk()
    });
  }

}
