import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'lib-text-area-field',
  template: `
      <textarea
              [rows]="rows"
              [placeholder]="placeholder"
              [id]="id"
              [formControl]="control"
              class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
      >
    </textarea>
      <p *ngIf="controlInvalid" class="text-red-500">
          {{ error }}
      </p>
  `,
  imports: [NgIf, ReactiveFormsModule],
})
export class TextAreaComponent {
  @Input() id!: string;
  @Input() placeholder: string = 'Write a post...';
  @Input() rows: number = 4;
  @Input() control!: FormControl;
  @Input() error!: string;

  get controlInvalid(): boolean {
    const ctrl = this.control as FormControl;
    return ctrl.invalid && ctrl.touched;
  }
}
