/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-27 11:47:45
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-01 11:47:45
 */

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import 'jquery';
import 'ztree';
declare var $: any;

interface Tree {
  checked: boolean;
  code: string;
  name: string;
  pcode: string;
  type: string;
}
@Component({
  selector: 'sd-tree',
  styleUrls: ['./tree.component.less'],
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit, OnDestroy {
  @Input() data: Tree[] = [];
  @Input() treeId = 'ztree';
  @Input() treeStyle = {};
  @Output() checkedNodesChange: EventEmitter<object[]> = new EventEmitter<object[]>();
  @ViewChild('tree') tree;
  setting = {
    treeId: 'ztree',
    check: {
      enable: true,
      chkboxType: {
        'Y': 'ps',
        'N': 'ps'
      }
    },
    view: {
      dblClickExpand: true
    },
    data: {
      simpleData: {
        enable: true,
        idKey: 'code',
        pIdKey: 'pcode',
        rootPId: 0
      }
    },
    callback: {
      onCheck: this.onCheck.bind(this)
    }
  };

  constructor() { }
  ngOnInit() {
    $.fn.zTree.init($(this.tree.nativeElement), this.setting, this.data);
  }

  onCheck(e, treeId, treeNode) {
    const zTree = $.fn.zTree.getZTreeObj(treeId);
    const nodes = zTree.getCheckedNodes(true), checkNodes = [];
    for (let i = 0, l = nodes.length; i < l; i++) {
      const node = nodes[i];
      checkNodes.push({
        code: node.code,
        name: node.name,
        type: node.type,
        pcode: node.pcode,
        checked: true
      });
    }
    // console.log(checkNodes);
    this.checkedNodesChange.emit(checkNodes);
  }

  ngOnDestroy() {

  }

}
