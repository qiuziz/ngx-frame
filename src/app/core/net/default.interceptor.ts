import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable, of, throwError, TimeoutError } from 'rxjs';
import { mergeMap, catchError, timeout } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { HttpDES, SED } from '@common/encrypt-des';
import { LoadingService } from '@component/loading/loading.service';
/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private loading: LoadingService) {}

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    this.injector.get(_HttpClient).end();
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         setTimeout(() => {
        //           this.loading.hide();
        //         }, 1000);
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //         const res = body;
        //         if (res) {
        //           console.log(event.url, '接口返回：', res);
        //           if (res && res.resultCode !== '0000') {
        //             if (res.resultCode === '0014') {
        //               this.goTo('/passport/login');
        //             }
        //             this.msg.error(res.resultDesc, {nzDuration: 5000});
        //             return throwError({});
        //           }
        //           return of(new HttpResponse(Object.assign(event, { body: res })));
        //         }
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 401: // 未登录状态码
        this.goTo('/passport/login');
        break;
      case 403:
      case 404:
      case 500:
        // this.goTo(`/${event.status}`);
        if (event instanceof HttpErrorResponse) {
          this.loading.hide();
          console.warn(
            '接口禁止访问或不存在以及服务端错误',
            event,
          );
          this.msg.error(event.message, {nzDuration: 5000});
          return throwError({});
        }
        break;
      default:
        if (event instanceof HttpErrorResponse || event instanceof TimeoutError) {
          this.loading.hide();
          console.warn(
            '未可知错误，大部分是由于后端不支持CORS或无效配置或者接口响应超时引起',
            event,
          );
          this.msg.error(event.message, {nzDuration: 5000});
          return throwError({});
        }
        break;
    }
    return of(event);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }

    const newReq = req.clone({
      url: url,
    });
    this.loading.show();
    return next.handle(newReq).pipe(
      timeout(10000),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
    );
  }
}
