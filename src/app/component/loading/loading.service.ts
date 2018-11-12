/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-25 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-10-29 20:38:55
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loadingObservable = new Subject<boolean>();

  constructor() { }

  show() {
    this.loadingObservable.next(true);
  }

  hide() {
    this.loadingObservable.next(false);
  }
}
