import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpTaskService } from '../../interfaces/http-task-service.interface';
import { MockService } from '../mock/mock.service';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpTaskService: HttpTaskService;
  
  /**
   * Dynamically selects the appropriate HTTP task service based on the environment configuration.
   * If the environment is set to development, MockService is used for mocking purposes.
   * Otherwise, the TaskService itself is injected.
   */
  constructor() {
    if (environment.development) {
      this.httpTaskService = inject(MockService);
    } else {
      this.httpTaskService = inject(TaskService);
    }
  }
  
  /**
   * Retrieves tasks associated with the current user.
   */
  getUserTasks(): Observable<Task[]> {
    return this.httpTaskService.getUserTasks();
  }
  
  /**
   * Adds a new task.
   */
  addTask(task: Task): Observable<Task[]> {
    return this.httpTaskService.addTask(task);
  }
  
  /**
   * Edits an existing task.
   */
  editTask(task: Task): Observable<Task[]> {
    return this.httpTaskService.editTask(task);
  }
  
  /**
   * Deletes a task.
   */
  deleteTask(id: string): Observable<Task[]> {
    return this.httpTaskService.deleteTask(id);
  }
}
