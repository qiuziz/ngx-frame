import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Inject,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
  NavigationCancel,
  NavigationStart,
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ScrollService, MenuService, SettingsService } from '@delon/theme';

import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { updateHostClass } from '@delon/util';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  preserveWhitespaces: false,
  host: {
    '[class.alain-default]': 'true',
  },
})
export class LayoutDefaultComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private notify$: Subscription;
  isFetching = false;
  @ViewChild('settingHost', { read: ViewContainerRef })
  settingHost: ViewContainerRef;

  constructor(
    router: Router,
    scroll: ScrollService,
    _message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    public menuSrv: MenuService,
    public settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
  ) {
    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        }
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });
  }

  private setClass() {
    const { el, renderer, settings } = this;
    const layout = settings.layout;
    updateHostClass(
      el.nativeElement,
      renderer,
      {
        ['alain-default']: true,
        [`alain-default__fixed`]: layout.fixed,
        [`alain-default__boxed`]: layout.boxed,
        [`alain-default__collapsed`]: layout.collapsed,
      },
      true,
    );

    this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }

  ngAfterViewInit(): void {
    // Setting componet for only developer
  }

  ngOnInit() {
    this.notify$ = this.settings.notify.subscribe(() => this.setClass());
    this.setClass();
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
