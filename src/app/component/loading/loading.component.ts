/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-25 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:48:28
 */

import { Component, OnInit, Input, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sd-loading',
  styleUrls: ['./loading.component.less'],
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit, OnDestroy {

  constructor(private loadingService: LoadingService) { }
  @ViewChild('indicatorTemplate') indicatorTemplate;
  @Input() indicator: TemplateRef<void>;

  loading = false;
  loadingTake: Subscription;
  ngOnInit() {
    this.loadingTake = this.loadingService.loadingObservable.subscribe(state => {
      this.loading = state;
    });
    setTimeout(() => {
        this.indicatorTemplate = this.indicator || this.indicatorTemplate;
    }, 500);
  }


  ngOnDestroy() {
    this.loadingTake.unsubscribe();
  }

}
