import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-link',
  template: `<a [routerLink]="link" [ngClass]="className">{{ label }}</a>`,
  imports: [RouterLink, NgClass],
})
export class LinkComponent {
  @Input() link: string = '#';
  @Input() label: string = '';
  @Input() className: string = 'text-primary-600';
}
