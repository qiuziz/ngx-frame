/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-25 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-10-25 13:59:59
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  loading = false;
  loadOnce = true;
  data = {};
}
