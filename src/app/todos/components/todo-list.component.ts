import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'todo-list',
  template: `
    <ul class="list-group">
      <li class="list-group-item"
        *ngFor="let todo of (todos | todoFilter: statusNav)">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right"
              (click)="removeTodo.emit(todo.id)"></span>
          </a>
          <label class="i-checks" [for]="todo.id">
            <input type="checkbox" [id]="todo.id"
              (change)="toggleComplete.emit(todo.id)"
              [checked]="todo.completed"><i></i>
            <span>{{todo.content}}</span>
          </label>
        </div>
      </li>
    </ul>
  `
})
export class TodoListComponent {

  @Input() todos: Todo[];
  @Input() statusNav: string;
  @Output() removeTodo = new EventEmitter();
  @Output() toggleComplete = new EventEmitter();

}
