import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-avatar',
    template: `<img class="w-8 h-8 rounded-full" [src]="src" alt="User Avatar">`
})
export class AvatarComponent {
    @Input() src: string = 'favicon.ico';
}
