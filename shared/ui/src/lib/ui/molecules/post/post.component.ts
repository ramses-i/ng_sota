import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';

@Component({
  imports: [AvatarComponent],
  selector: 'lib-post',
  template: `
      <article
              class="p-6 mb-6 bg-white border-t dark:border-gray-700 dark:bg-gray-900"
      >
          <div class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                  <lib-avatar [src]="avatarUrl"></lib-avatar>
                  <p class="ml-2 font-semibold text-sm text-gray-900 dark:text-white">
                      {{ username }}
                  </p>
                  <p class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {{ formattedDate }}
                  </p>
              </div>
          </div>
          <p class="text-black dark:text-white">{{ content }}</p>
      </article>
  `,
})
export class PostComponent {
  @Input() avatarUrl: string = 'https://i.pravatar.cc/150';
  @Input() username: string = 'User';
  @Input() date: string = new Date().toISOString();
  @Input() content: string = '';

  get formattedDate(): string {
    return new Date(this.date).toLocaleDateString();
  }
}
