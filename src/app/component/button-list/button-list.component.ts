/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-23 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:48:54
 */

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { LocalStorage } from '@common/local-storage';
import { Location } from '@angular/common';

interface Button {
  buttonName: string;
}

@Component({
  selector: 'sd-button-list',
  styleUrls: ['./button-list.component.less'],
  templateUrl: './button-list.component.html'
})
export class ButtonListComponent implements OnInit, OnDestroy {
  buttonList: Button[] = [];
  @Input() clickBtn: Function = () => {};

  constructor(private location: Location) { }

  ngOnInit() {
    this.buttonList = this.getButtonList(this.location.path());
  }

  getButtonList(url): Button[] {
    if (!url) {
      return [];
    }
    const menuButtonList = LocalStorage.getItem('menuInfo').menuButtonList;
    const buttonArray = menuButtonList.filter(item => item.link === url);
    return (buttonArray.length > 0 && buttonArray[0].childButtonList) ? buttonArray[0].childButtonList : [];
  }

  ngOnDestroy() {
    window.onresize = null;
  }

}
