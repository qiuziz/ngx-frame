import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { HttpService } from '@core/net/http.service';
import { LocalStorage } from '@common/local-storage';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { DES, SED } from '@common/encrypt-des';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  scodeSrc: any = '';

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    private httpService: HttpService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      inputCode: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // region: fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get inputCode() {
    return this.form.controls.inputCode;
  }
  get remember() {
    return this.form.controls.remember;
  }

  ngOnInit(): void {
    this.getCaptcha();
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // tslint:disable-next-line:member-ordering
  count = 0;
  // tslint:disable-next-line:member-ordering
  interval$: any;


  // 点击刷新验证码
  getCaptcha() {
    // const imgUrl = `assets/images/code.png&time=${new Date().getTime()}`;
    // this.httpService.get(imgUrl, {}, {
    //   responseType: 'blob',
    //   observe: 'response',
    // }).subscribe((res: any) => {
    //   const blob = new Blob([res.body], {
    //     type: res.headers.get('Content-Type')
    //   });
    //   const urlCreator = window.URL;
    //   this.scodeSrc = this.sanitizer.bypassSecurityTrustUrl(
    //     urlCreator.createObjectURL(blob)
    //     );
    // });
    this.scodeSrc = 'assets/images/code.png';
  }

  // endregion
  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      this.inputCode.markAsDirty();
      this.inputCode.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid || this.inputCode.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.inputCode.markAsDirty();
      this.inputCode.updateValueAndValidity();
      if (this.mobile.invalid || this.inputCode.invalid) return;
    }

    // **注：** DEMO中使用 `setTimeout` 来模拟 http
    // 默认配置中对所有HTTP请求都会强制[校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loading = true;
    this.httpService.post('login', {},  {
      userName: this.userName.value,
      passWord: this.password.value,
      inputCode: this.inputCode.value,
      remember: this.remember.value,
    })
    .subscribe((res: any) => {
      this.loading = false;
      const { userName } = res.data;
      const userInfo = Object.assign({}, { userName });
      LocalStorage.setItem('userInfo', userInfo);
      // 清空路由复用信息
      this.reuseTabService.clear();
      // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
      this.httpService.post('router').subscribe((menu: any) => {
        LocalStorage.setItem('menuInfo', menu.data);
        this.startupSrv.load().then(() => this.router.navigate(['/']));
      });
    }, err => {
      this.getCaptcha();
      this.loading = false;
    });
  }

  // region: social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    if (environment.production)
      callback = 'https://ng-alain.github.io/ng-alain/callback/' + type;
    else callback = 'http://localhost:4200/callback/' + type;
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window',
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href',
      });
    }
  }

  // endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
