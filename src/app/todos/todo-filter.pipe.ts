import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], status?: string) {

    /* filter
      All/undefined : 아무것도 하지 않는다
      Active : todo.completed가 false인 것만 표시
      Completed : todo.completed가 true인 것만 표시
    */

    if (!todos) return;

    // 필터링된 todos를 반환한다
    return todos.filter(({completed}) => {
      switch (status) {
        case 'Active':    return completed === false;
        case 'Completed': return completed === true;
        default:          return true;
      }
    });
  }

}
