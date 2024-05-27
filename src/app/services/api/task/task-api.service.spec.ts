import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Task } from '../../../interfaces/task.interface';

import { TaskApiService } from './task-api.service';

describe('TaskApiService', () => {
  let service: TaskApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskApiService]
    });
    service = TestBed.inject(TaskApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get user tasks', () => {
    const task: Task = {
      id: '23ffew',
      userId: 'gf885d',
      title: 'Task Title',
      description: 'Task Description',
      completed: false
    };
    
    service.getUserTasks().subscribe((tasks) => {
      expect(tasks).toEqual([task]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/tasks`);
    expect(req.request.method).toBe('GET');
    
    req.flush(task);
  });
  
  it('should add task', () => {
    const task: Task = {
      id: '23ffew',
      userId: 'gf885d',
      title: 'Task Title',
      description: 'Task Description',
      completed: false
    };
    
    service.addTask(task).subscribe((tasks) => {
      expect(tasks).toEqual([task]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(task);
    
    req.flush(task);
  });
  
  it('should edit task', () => {
    const task: Task = {
      id: '23ffew',
      userId: 'gf885d',
      title: 'Task Title',
      description: 'Task Description',
      completed: false
    };
    
    service.editTask(task).subscribe((tasks) => {
      expect(tasks).toEqual([task]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/tasks`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(task);
    
    req.flush(task);
  });
  
  it('should delete task', () => {
    const task: Task = {
      id: '23ffew',
      userId: 'gf885d',
      title: 'Task Title',
      description: 'Task Description',
      completed: false
    };
    
    service.deleteTask('23ffew').subscribe((tasks) => {
      expect(tasks).toEqual([task]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/tasks/23ffew`);
    expect(req.request.method).toBe('DELETE');
    
    req.flush(task);
  });
});
