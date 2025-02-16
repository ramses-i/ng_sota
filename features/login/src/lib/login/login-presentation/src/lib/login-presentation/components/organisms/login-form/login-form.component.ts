import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '@ng-sota/ui';
import { ButtonComponent } from '@ng-sota/ui';

@Component({
  imports: [FormFieldComponent, ButtonComponent, ReactiveFormsModule],
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<{ email: string; password: string }>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.value);
    }
  }
}
