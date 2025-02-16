import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-feed-presentation',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './feed-presentation.component.html',
  styleUrl: './feed-presentation.component.css',
})
export class FeedPresentationComponent {}
