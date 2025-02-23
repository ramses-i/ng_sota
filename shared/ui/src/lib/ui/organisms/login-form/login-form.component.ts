import {Component, Output, EventEmitter, Input} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import {NgIf} from "@angular/common";

@Component({
  imports: [FormFieldComponent, ButtonComponent, ReactiveFormsModule, NgIf],
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Input() error!: string;
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
