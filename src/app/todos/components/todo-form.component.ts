import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-form',
  template: `
    <input class="form-control input-lg"
      placeholder="What needs to be done?"
      autofocus
      [(ngModel)]="content"
      (keyup.enter)="onEnter()">
  `
})
export class TodoFormComponent {

  content: string;
  @Output() addTodo = new EventEmitter();

  onEnter() {
    if (this.content) {
      this.addTodo.emit(this.content);
      this.content = '';
    }
  }
}
