import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'todo-container',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1 class="title">Todos</h1>

          <todo-form (addTodo)="addTodo($event)"></todo-form>

        <ng-container *ngIf='todos'>

          <todo-nav
            [navItems]="navItems"
            [statusNav]="selectedNavItem"
            (changeStatusNav)="setCurrentNavItem($event)"></todo-nav>

          <todo-list
            [todos]="todos"
            [statusNav]="selectedNavItem"
            (removeTodo)="removeTodo($event)"
            (toggleComplete)="toggleComplete($event)"></todo-list>

          <todo-footer
            [cntCompletedTodos]="getCntCompletedTodos()"
            [cntActiveTodos]="getCntActiveTodos()"
            (changeStatusToggleAllTodo)="toggleAllTodoAsComplete($event)"
            (removeCompletedTodos)="removeCompletedTodos()"></todo-footer>
        </ng-container>
        </div>
      </div>
    </div>
  `
})
export class TodoContainerComponent implements OnInit {
  todos: Todo[];
  // navigation items
  navItems = ['All', 'Active', 'Completed'];
  // 선택된 navigation item
  selectedNavItem: string;
  appUrl: string = environment.apiUrl;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    console.log('[appUrl]', this.appUrl);
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.appUrl)
      .subscribe( todos=> this.todos = todos);
  }

  addTodo(content: string) {
    const newTodo = { id: this.lastTodoId(), content, completed: false }
    this.http.post(this.appUrl, newTodo)
      .subscribe(() => this.todos = [newTodo, ...this.todos]);
  }

  removeTodo(id: number) {
    console.log(this.appUrl)
    console.log(id)
    this.http.delete(`${this.appUrl}/id/${id}`, { responseType: 'text'})
      .subscribe(()=>this.todos=this.todos.filter(todo=>todo.id !==id));
  }

  removeCompletedTodos() {
    this.http.delete(`${this.appUrl}/completed`, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));

    // this.todos = this.todos.filter(todo => todo.completed !== true);
  }

  toggleComplete(id: number) {
    const { completed } = this.todos.find(todo => todo.id === id);
    const payload = { completed: !completed };

    this.http.patch(`${this.appUrl}/id/${id}`, payload, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.map(todo => {
        return todo.id === id ? Object.assign(todo, { completed: !completed }) : todo;
      }));
  }


  toggleAllTodoAsComplete(completed: boolean) {
    this.http.patch(`${this.appUrl}`, { completed }, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.map(todo => {
        return Object.assign(todo, { completed });
      }));
  }

  setCurrentNavItem(selectedNavItem: string) {
    this.selectedNavItem = selectedNavItem;
  }

  getCntCompletedTodos(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getCntActiveTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  lastTodoId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }
}
