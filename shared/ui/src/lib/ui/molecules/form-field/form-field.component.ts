import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputFieldComponent } from '../../atoms/input/input-field.component';
import { NgIf } from '@angular/common';

@Component({
  imports: [InputFieldComponent, NgIf],
  selector: 'lib-form-field',
  template: `
    <lib-input-field
      [label]="label"
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [control]="control"
    ></lib-input-field>
    <p id="errorLibFormField" *ngIf="controlInvalid" class="text-red-500">
      {{ error }}
    </p>
  `,
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() error!: string;

  get controlInvalid(): boolean {
    const ctrl = this.control as FormControl;
    return ctrl.invalid && ctrl.touched;
  }
}
