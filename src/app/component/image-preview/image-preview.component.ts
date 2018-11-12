/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-25 13:59:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:48:35
 */

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'sd-image-preview',
  styleUrls: ['./image-preview.component.less'],
  templateUrl: './image-preview.component.html'
})
export class ImagePreviewComponent implements OnInit, OnDestroy {
  @Input() data: string[] = [];
  @ViewChild('tplContent') tplContent;
  show = '';

  constructor(private modalService: NzModalService) { }
  ngOnInit() {
    console.log(this.data);
  }

  preview(image) {
    this.show = image;
    this.modalService.create({
      nzContent: this.tplContent,
      nzMaskClosable: true,
      nzClosable: true,
      nzFooter: null
    });
  }

  ngOnDestroy() {
  }

}
