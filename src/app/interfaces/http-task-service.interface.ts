import { Observable } from 'rxjs';
import { Task } from './task.interface';

export interface HttpTaskService {
  getUserTasks(): Observable<Task[]>;
  addTask(task: Task): Observable<Task[]>;
  editTask(task: Task): Observable<Task[]>;
  deleteTask(id: string): Observable<Task[]>;
}
