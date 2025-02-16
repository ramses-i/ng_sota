import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-text-area',
    template: `
    <textarea [rows]="rows" [placeholder]="placeholder"
      class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800">
    </textarea>
  `
})
export class TextAreaComponent {
    @Input() rows: number = 4;
    @Input() placeholder: string = 'Write a post...';
}
