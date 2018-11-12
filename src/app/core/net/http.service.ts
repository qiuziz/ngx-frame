/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-19 11:50:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-02 16:23:25
 */

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from './resource-api';
import { GlobalsService } from '@common/globals.service';
import { LocalStorage } from '@common/local-storage';
const matchUrlSearchParams = (url, urlSearchParams) => {
  if (!urlSearchParams) {
    return url.replace(/\/:[^?]+/g, '');
  }
  const u = new URLSearchParams();
  let _url = Object.keys(urlSearchParams).reduce((pre, next) => {
    if (pre.includes(':' + next)) {
      return pre.replace(':' + next, urlSearchParams[next]);
    } else {
      if (urlSearchParams[next] && urlSearchParams[next].constructor === Array) {
        urlSearchParams[next].forEach(value => {
          u.append(next, value);
        });
      } else {
        u.append(next, urlSearchParams[next]);
      }
      return pre;
    }
  }, url);
  _url = _url.replace(/\/:[^?]+/g, '');
  return _url + (u.toString() === '' ? '' : '?' + u);
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers;
  private options;
  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.headers = new HttpHeaders(
      { 'Content-Type': 'application/json' }
    );
    this.options = { headers: this.headers };
  }

  get(url, urlSearchParams?, options?): Observable<any> {
    return this.http.request('GET', matchUrlSearchParams(Resource[url] || url, urlSearchParams), { ...this.options, ...options });
  }

  post(url, urlSearchParams?, bodyParams = {}, options?): Observable<any> {

    return this.http.request('POST', matchUrlSearchParams(Resource[url] || url, urlSearchParams),
      Object.assign({ ...this.options, ...options }, {
        body: JSON.stringify({ ...bodyParams })
      })
    );
  }

  delete(url, urlSearchParams, options) {
    return this.http.request('DELETE', matchUrlSearchParams(Resource[url], urlSearchParams), { ...this.options, ...options });
  }

  put(url, urlSearchParams, bodyParams, options) {
    return this.http.request('PUT', matchUrlSearchParams(Resource[url], urlSearchParams),
      Object.assign({ ...this.options, ...options }, {
        body: JSON.stringify(bodyParams)
      })
    );
  }

  patch(url, urlSearchParams, bodyParams, options) {
    return this.http.request('PATCH', matchUrlSearchParams(Resource[url], urlSearchParams),
      Object.assign({ ...this.options, ...options }, {
        body: JSON.stringify(bodyParams)
      })
    );
  }
}
