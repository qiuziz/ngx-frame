/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-27 11:48:09
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 17:11:14
 */


import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { dateFormat } from '@common/multi-platform-date';

enum ConditionType { string, number, numberRange, dateRange, date, select }

interface InputNumber {
    queryIndex: string;
    placeholder: string;
}
interface Condition {
  label: string;
  type: ConditionType;
  placeholder: string;
  queryIndex: string;
  data?: any[];
  range?: string[];
  dateValue?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  value?: string;
  name?: string;
  childQueryIndex?: string;
  start?: InputNumber;
  end?: InputNumber;
}
function fillOpts(searchOptions): object {
  const DEFAULT_CONFIGS = {
    showConditions: 2,
    animation: true,
  };

  return Object.assign(searchOptions, Object.assign(DEFAULT_CONFIGS, searchOptions));
}

const NUMBER_RANGE = 300, DATE_RANGE = 580, DATE = 320, STRING = 260;

@Component({
  selector: 'sd-search-box',
  styleUrls: ['./search-box.component.less'],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() conditions: Condition[] = [];
  @Input() queryParams: any = {};
  @Output() queryParamsChange: EventEmitter<void> = new EventEmitter();
  @Input() buttonList = [];
  slideToggle = false; // 搜索框收起展示
  cloneQueryParams: any = {};
  opts: any = {};
  range = {};
  constructor(private elementRef: ElementRef) { }
  ngOnInit() {
    fillOpts(this.opts);

    if (this.opts.animation) {
      setTimeout(() => {
        this.adjustConditionsShow();
        this.cloneQueryParams = _.cloneDeep(this.queryParams);
      }, 0);

    }

  }

  ngAfterViewInit() {
    // this.adjustConditionsShow();
  }

  handleDate(date) {
    if (!date) return date;
    return new Date(date);
  }

  reset() {
    this.range = {};
    this.queryParams = _.cloneDeep(this.cloneQueryParams);
    this.queryParamsChange.emit(this.queryParams);
  }

  nzDateDisable = (start, end) => (value: Date) => {
    if (!start || !end) {
      return false;
    }
    return value.getTime() > end.getTime() || value.getTime() < start.getTime();
  }

  buttonClick(btn) {
    if (btn.reset) {
      this.reset();
      return;
    }
    if (btn.query) {
      const queryParams = {};
      Object.keys(this.queryParams).forEach(key => {
        if (_.isDate(this.queryParams[key])) {
          queryParams[key] = dateFormat(this.queryParams[key]);
        } else {
          queryParams[key] = this.queryParams[key];
        }
      });
      btn.click(queryParams);
      return;
    }

    btn.click();
  }

  dataRangeChange(dateRange, rangeKeys) {
    console.log(this.range);
    this.queryParams[rangeKeys[0]] = dateRange[0];
    this.queryParams[rangeKeys[1]] = dateRange[1];
  }

  changeChildData(condition) {
    this.queryParams[condition.childQueryIndex] = '';
    if (_.isFunction(condition.change)) {
      condition.change(this.queryParams[condition.queryIndex]);
    }
  }

  showHide() {
    this.slideToggle = !this.slideToggle;
  }

  adjustConditionsShow() {
    const searchContentEle = this.elementRef.nativeElement.querySelector('.app-list-search');
    let boxWidth = 0;
    this.opts.showConditions = 0;
    for (let i = 0, len = this.conditions.length; i < len; i++) {
      if (this.conditions[i].type === ConditionType.numberRange) {
        boxWidth += NUMBER_RANGE;
      } else if (this.conditions[i].type === ConditionType.date) {
        boxWidth += DATE;
      } else if (this.conditions[i].type === ConditionType.dateRange) {
        boxWidth += DATE_RANGE;
      } else {
        boxWidth += STRING;
      }
      if (boxWidth <= searchContentEle.offsetWidth) {
        this.opts.showConditions++;
      } else {
        break;
      }
    }
  }

  ngOnDestroy() {
    window.onresize = null;
  }

}
