/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-19 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:49:05
 */

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SDCOMPONENTS } from './index';

@NgModule({
  imports: [
    // SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    ...SDCOMPONENTS
  ],
  exports: [
    ...SDCOMPONENTS
  ]
})
export class ComponentModule { }
