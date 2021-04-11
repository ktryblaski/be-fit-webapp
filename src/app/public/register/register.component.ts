import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {RegisterFormValue} from './register-form/-model/register-form-value';
import {RegisterService} from './register.service';
import {RegisterUserRequestDto} from '../../shared/service/rest/register/-model/register-user-request.dto';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  public registering$: Observable<boolean>;

  constructor(private router: Router,
              private service: RegisterService) { }

  ngOnInit(): void {
    this.registering$ = this.service.registering$;
  }

  handleRegister(user: RegisterFormValue) {
    this.service.register(this.map(user));
  }

  private map(user: RegisterFormValue): RegisterUserRequestDto {
    return {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password.password
    };
  }

}
