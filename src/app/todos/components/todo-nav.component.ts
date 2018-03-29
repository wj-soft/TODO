import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-nav',
  template: `
    <ul class="nav nav-xs nav-pills">
      <li *ngFor="let navItem of navItems"
        [class.active]="navItem===statusNav">
        <a (click)="changeStatusNav.emit(navItem)">{{navItem}}</a>
      </li>
    </ul>
  `
})
export class TodoNavComponent {

  @Input() navItems: string[];
  @Input() statusNav: string;
  @Output() changeStatusNav = new EventEmitter();

}
