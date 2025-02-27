import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutMainFacade } from './logout-main.facade';

@Component({
  selector: 'lib-logout-main',
  imports: [CommonModule],
  templateUrl: './logout-main.component.html',
  styleUrl: './logout-main.component.css',
})
export class LogoutMainComponent {
  constructor(private controller: LogoutMainFacade) {
    this.controller.logout();
  }
}
