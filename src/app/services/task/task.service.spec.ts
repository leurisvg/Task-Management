import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpTaskService } from '../../interfaces/http-task-service.interface';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let mockHttpTaskService: HttpTaskService;
  const task: Task = {
    id: '23ffew',
    userId: 'gf885d',
    title: 'New Task Title',
    description: 'New Task Description',
    completed: false
  };

  beforeEach(() => {
    mockHttpTaskService = {
      getUserTasks: jest.fn().mockReturnValue(of([task])),
      addTask: jest.fn().mockReturnValue(of([task])),
      editTask: jest.fn().mockReturnValue(of([task])),
      deleteTask: jest.fn().mockReturnValue(of([task]))
    };
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should retrieve user tasks', () => {
    service.getUserTasks().subscribe(tasks => {
      expect(tasks).toEqual([task]);
      expect(mockHttpTaskService.getUserTasks).toHaveBeenCalled();
    });
  });
  
  it('should add new task', () => {
    service.addTask(task).subscribe(tasks => {
      expect(tasks).toEqual([task]);
      expect(mockHttpTaskService.addTask).toHaveBeenCalledWith(tasks);
    });
  });
  
  it('should edit task', () => {
    service.editTask(task).subscribe(tasks => {
      expect(tasks).toEqual([task]);
      expect(mockHttpTaskService.editTask).toHaveBeenCalledWith(tasks);
    });
  });
  
  it('should delete a task', () => {
    const id = '23ffew';
    service.deleteTask(id).subscribe(tasks => {
      expect(tasks).toEqual([task]);
      expect(mockHttpTaskService.deleteTask).toHaveBeenCalledWith(id);
    });
  });
});
