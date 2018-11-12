/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-24 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:48:47
 */

import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface FromValidatorError {
  [key: string]: string;
}

enum ItemType { input, select, textarea, inputNumber }

interface FromItem {
  label: string;
  value: string;
  type: ItemType;
  placeholder: string;
  itemType?: string;
  optionLabel?: string;
  optionValue?: string;
  selectData?: any[];
  required?: boolean;
  error?: FromValidatorError;
  ngIf?: boolean;
  selectChange?: EventEmitter<any[]>;
}

@Component({
  selector: 'sd-from',
  styleUrls: ['./from.component.less'],
  templateUrl: './from.component.html'
})
export class FromComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Input() fromItems: FromItem[] = [];

  objectKeys = Object.keys;

  constructor() { }
  ngOnInit() {
    // console.log('111', this.formGroup);
  }

  ngOnDestroy() {
  }

}
