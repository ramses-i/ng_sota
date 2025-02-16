import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <button
      [disabled]="disabled"
      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() disabled: boolean = false;
}
