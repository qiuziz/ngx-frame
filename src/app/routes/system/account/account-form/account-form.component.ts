/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-22 17:26:57
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-02 16:18:02
 */

import { Component, OnInit } from '@angular/core';
import { HttpService } from '@core/net/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigateService } from '@common/navigate.service';

@Component({
  selector: 'app-system-account-form',
  styleUrls: ['./account-form.component.less'],
  templateUrl: './account-form.component.html',
})
export class AccountFormComponent implements OnInit {

  validateForm: FormGroup;
  user: any = {
    accountName: '',
    userNickName: '',
    password: '',
    newPassword: '',
    checkPassword: '',
    permGroupCode: null,
    roleCode: null,
    isNetworkPerm: '0',
    bindingIp: '',
    remark: ''
  };
  permissionGroupBeanList: any = [];
  roleList: any = [];
  type: string;
  pwd = false;
  edit = false;
  fromOpts = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private navigate: NavigateService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.getlistPermGroup();
    this.route.params.subscribe(params => {
      const stateData = this.navigate.getParams(params);

      this.type = stateData.type;
      this.user = {
        ...this.user,
        ...stateData.data
      };
      console.log(this.user);
      this.user.accountName = this.user.userName;
      this.user.userNickName = this.user.nickName;
      // 修改密码
      if (this.type === 'updatePwd') {
        this.user.newPassword = '';
        this.pwd = true;
        this.user.password = '';
      }
      // 修改账号
      if (this.type === 'update') {
        this.edit = true;
        this.getRoleByPerm(this.user.permGroupCode);
      }

      this.validateForm = this.fb.group({
        accountName: [ {value: this.user.accountName, disabled: (this.pwd || this.type !== 'create')}, [ Validators.required ] ],
        password: [ null, [ Validators.required ] ],
        checkPassword: [ null, [ Validators.required, this.confirmationValidator ] ],
        userNickName: [ this.user.userNickName, [ Validators.required ] ],
        roleCode: [ this.user.roleCode, [ Validators.required ] ],
        permGroupCode: [ {value: this.user.permGroupCode, disabled: this.type !== 'create' }, [ Validators.required ] ],
        isNetworkPerm: [ this.user.isNetworkPerm || '0' ],
        bindingIp: [ this.user.bindingIp ],
        remark: [ this.user.remark ],
        newPassword: [ '' ],
      });
      this.fromOpts = this.createFromItems();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if ( this.type === 'create' && control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    } else if ( this.type === 'updatePwd' && control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      if (this.type === 'update' && (i === 'password' || i === 'checkPassword' || i === 'newPassword')) {
        this.validateForm.controls[ i ].clearValidators();
      }
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    if (this.validateForm.valid) {
      const type = this.type === 'create'
      ? 'insertUser'
      : (this.type === 'update'
        ? 'updateUser'
        : 'updateUserPwd');
      const tipMsg = this.type === 'create' ? '新增' : '修改';
      this.httpService.post('account', { type: type }, {...this.user, ...this.validateForm.value}).subscribe((res: any) => {
        this.message.success(`${tipMsg}成功`);
        this.back();
      });
    }
  }

  back(): void {
    history.go(-1);
  }

  /**
	 * @description 查询权限组
	 */
  getlistPermGroup() {
    this.httpService.post('group', { type: 'getPermGroup' }, {}).subscribe((res: any) => {
      this.permissionGroupBeanList = res.permissionGroupBeanList;
      this.fromOpts = this.createFromItems();
    });
  }

  /**
	 * @description 查询角色
	 */
  getRoleByPerm(permCode) {
    if (!permCode) {
      this.message.error('请选择所属权限组');
    }
    this.httpService.post('role', { type: 'getRoleByPerm' }, {permCode}).subscribe((res: any) => {
      this.roleList = res.roleList;
      this.fromOpts = this.createFromItems();
    });
  }

  /**
	 * @description 权限改变回调
	 */
  changePerm(value) {
    if (!value) {
      return;
    }
    this.getRoleByPerm(value);
  }


  createFromItems() {
    return [
      {
        label: '账号名称',
        value: 'accountName',
        type: 'input',
        required: true,
        placeholder: '请输入账号名称',
        error: {
          required: '请输入账号名称!'
        },
      },
      {
        label: '昵称',
        value: 'userNickName',
        type: 'input',
        required: true,
        placeholder: '请输入昵称',
        error: {
          required: '请输入昵称!',
        },
        ngIf: this.type === 'create' || this.type === 'update'
      },
      {
        label: '旧密码',
        value: 'password',
        type: 'input',
        inputType: 'password',
        required: true,
        placeholder: '请输入旧密码',
        error: {
          required: '请输入旧密码!',
        },
        ngIf: this.pwd
      },
      {
        label: '新密码',
        value: 'newPassword',
        type: 'input',
        inputType: 'password',
        required: true,
        placeholder: '请输入新密码',
        error: {
          required: '请输入新密码!',
        },
        ngIf: this.pwd
      },
      {
        label: '设置密码',
        value: 'password',
        type: 'input',
        inputType: 'password',
        required: true,
        placeholder: '请输入密码',
        error: {
          required: '请输入密码!',
        },
        ngIf: !this.pwd && !this.edit
      },
      {
        label: '确认密码',
        value: 'checkPassword',
        type: 'input',
        inputType: 'password',
        required: true,
        placeholder: '请再次输入密码',
        error: {
          required: '两次密码输入不一致!',
        },
        ngIf: this.pwd || !this.edit
      },
      {
        label: '所属权限组',
        value: 'permGroupCode',
        type: 'select',
        selectData: this.permissionGroupBeanList,
        selectChange: (value) => this.changePerm(value),
        optionLabel: 'permName',
        optionValue: 'permCode',
        required: true,
        placeholder: '请选择权限组',
        error: {
          required: '请选择权限组!',
        },
        ngIf: !this.pwd
      },
      {
        label: '选择角色',
        value: 'roleCode',
        type: 'select',
        selectData: this.roleList,
        optionLabel: 'roleName',
        optionValue: 'roleCode',
        required: true,
        placeholder: '请选择角色',
        error: {
          required: '请选择角色!',
        },
        ngIf: !this.pwd
      },
      {
        label: '外网权限',
        value: 'isNetworkPerm',
        type: 'select',
        selectData: [
          {label: '有', value: '1'},
          {label: '无', value: '0'}
        ],
        placeholder: '请选择外网权限',
        error: {
          required: '请选择外网权限!',
        },
        ngIf: !this.pwd
      },
      {
        label: '绑定IP',
        value: 'bindingIp',
        type: 'input',
        placeholder: '请输入绑定IP',
        ngIf: !this.pwd
      },
      {
        label: '备注',
        value: 'remark',
        type: 'textarea',
        placeholder: '请输入备注',
        ngIf: !this.pwd
      },
    ];
  }


}
