import { Component, Input } from '@angular/core';
import { LinkComponent } from '../../atoms/link/link.component';

@Component({
  imports: [LinkComponent],
  selector: 'lib-nav-item',
  template: `
    <li>
      <lib-link
        [link]="link"
        [label]="label"
        className="py-2 px-3 md:p-0 text-primary-600 font-bold"
      ></lib-link>
    </li>
  `,
})
export class NavItemComponent {
  @Input() link: string = '#';
  @Input() label: string = '';
}
