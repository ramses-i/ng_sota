import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-input-field',
  template: `
    <div>
      <label
        [for]="id"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {{ label }}
      </label>
      <input
        [formControl]="control"
        [type]="type"
        [id]="id"
        [placeholder]="placeholder"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  `,
  imports: [ReactiveFormsModule],
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
}
