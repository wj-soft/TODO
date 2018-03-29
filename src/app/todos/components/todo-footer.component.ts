import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-footer',
  template: `
    <div class="col-xs-6">
      <label class="i-checks" style="padding-left: 20px">
        <input type="checkbox"
          (change)="changeStatusToggleAllTodo.emit($event.target.checked)">
          <i></i><span>Mark all as complete</span>
      </label>
    </div>
    <div class="col-xs-6 text-right">
      <button class="btn btn-default btn-xs"
        (click)="removeCompletedTodos.emit()">
        Clear completed (<span>{{cntCompletedTodos}}</span>)
      </button>
      <strong>{{cntActiveTodos}}</strong>
        {{ cntActiveTodos > 1 ? 'items' : 'item' }} left
    </div>
  `
})
export class TodoFooterComponent {

  @Input() cntCompletedTodos: number;
  @Input() cntActiveTodos: number;
  @Output() changeStatusToggleAllTodo = new EventEmitter();
  @Output() removeCompletedTodos = new EventEmitter();
}
