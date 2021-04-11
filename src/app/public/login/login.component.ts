import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';
import {LoginFormValue} from './login-form/-model/login-form-value';
import {LoginRequestDto} from '../../shared/service/rest/auth/dto/login-request.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public logging$: Observable<boolean>;

  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.logging$ = this.service.logging$;
  }

  handleLogin(login: LoginFormValue) {
    this.service.login(this.map(login));
  }

  private map(login: LoginFormValue): LoginRequestDto {
    return {
      email: login.email,
      password: login.password
    };
  }

}
