export interface RegisterFormValue {
  name: string;
  surname: string;
  email: string;
  password: RegisterFormPasswordValue;
}

export interface RegisterFormPasswordValue {
  password: string;
  confirm: string;
}
