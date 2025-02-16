import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedTemplateComponent } from '@ng-sota/ui';

@Component({
  selector: 'lib-feed-main',
  imports: [CommonModule, FeedTemplateComponent],
  templateUrl: './feed-main.component.html',
  styleUrl: './feed-main.component.css',
})
export class FeedMainComponent {}
