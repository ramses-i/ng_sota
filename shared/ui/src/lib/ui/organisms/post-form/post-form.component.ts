import { Component } from '@angular/core';
import { TextAreaComponent } from '../../atoms/text-area/text-area.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  imports: [TextAreaComponent, ButtonComponent],
  selector: 'lib-post-form',
  template: `
    <form class="mb-6 px-4">
      <lib-text-area [rows]="6" placeholder="Write a post..."></lib-text-area>
      <lib-button label="Publish post"></lib-button>
    </form>
  `,
})
export class PostFormComponent {}
