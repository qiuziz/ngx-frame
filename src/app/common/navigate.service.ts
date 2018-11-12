/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-19 11:50:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:50:08
 */

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DES, SED } from '@common/encrypt-des';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  stateGo(toState: string, toParams: object): void {
    const params = _.cloneDeep(toParams), des = [];
    if (_.isEmpty(params)) {
      this.router.navigate([toState]);
      return;
    }
    Object.keys(params).forEach(key => {
      if (typeof params[key] === 'object') {
        params[key] = DES(params[key]);
        des.push(key);
      }
    });
    this.router.navigate([toState, {...params, des}]);
  }

  getParams(params: object): any {
      const data: any = _.cloneDeep(params), des = data.des ? data.des.split(',') : [];
      Object.keys(data).forEach(key => {
        if (des.indexOf(key) > -1) {
          data[key] = SED(data[key]);
        }
      });
      return  _.omit(data, ['des']);
  }
  getParam(params: object, key: string): any {
    const data: any = _.cloneDeep(params), des = data.des ? data.des.split(',') : [];
    if (des.indexOf(key) > -1) {
      return DES(data[key]);
    }
    return data[key];
  }
}
