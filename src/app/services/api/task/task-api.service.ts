import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpTaskService } from '../../../interfaces/http-task-service.interface';
import { Task } from '../../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService implements HttpTaskService {
  #http = inject(HttpClient);
  #url = `${ environment.apiUrl }/tasks`;
  
  /**
   * Retrieves tasks associated with the current user from the tasks API.
   */
  getUserTasks(): Observable<Task[]> {
    return this.#http.get<Task[]>(this.#url);
  }
  
  /**
   * Adds a new task.
   */
  addTask(task: Task): Observable<Task[]> {
    const body = {
      ...task
    }
    
    return this.#http.post<Task[]>(this.#url, body);
  }
  
  /**
   * Edits an existing task.
   */
  editTask(task: Task): Observable<Task[]> {
    const body = {
      ...task
    }
    
    return this.#http.put<Task[]>(this.#url, body);
  }
  
  /**
   * Deletes a task.
   */
  deleteTask(id: string): Observable<Task[]> {
    return this.#http.delete<Task[]>(`${this.#url }/${ id }`);
  }
}
