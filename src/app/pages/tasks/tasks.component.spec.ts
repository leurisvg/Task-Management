import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TaskService } from '../../services/task/task.service';
import TasksComponent from './tasks.component';
import { Task } from '../../interfaces/task.interface';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let matDialogMock: any;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      getUserTasks: jest.fn().mockReturnValue(of([{ id: '6546fd', title: 'Task', description: 'Description', completed: false }])),
      addTask: jest.fn().mockReturnValue(of([{ id: '23ffew', userId: 'gf885d', title: 'New Task Title', description: 'New Task Description', completed: false }])),
      editTask: jest.fn().mockReturnValue(of([{ id: '5dss89', userId: 'gf885d', title: 'Updated Task', description: 'Updated Description', completed: false }])),
      deleteTask: jest.fn().mockReturnValue(of([{ id: '5fsdf6', userId: 'gf885d', title: 'Task Title', description: 'Task Description', completed: false }])),
    };
    
    matDialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(null))
      })
    };
    
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it ('should add new task', () => {
    const newTask: Task = {
      id: '23ffew',
      userId: 'gf885d',
      title: 'New Task Title',
      description: 'New Task Description',
      completed: false
    };
    
    matDialogMock.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of(newTask))
    });
    
    component.addTask();
    
    expect(taskServiceMock.addTask).toHaveBeenCalledWith(newTask);
    expect(component.tasks()).toEqual([{
      id: '23ffew',
      userId: 'gf885d',
      title: 'New Task Title',
      description: 'New Task Description',
      completed: false
    }]);
  });
  
  it('should edit task', () => {
    const updatedTask: Task = {
      id: '5dss89',
      userId: 'gf885d',
      title: 'Updated Task',
      description: 'Updated Description',
      completed: false
    };
    
    matDialogMock.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of(updatedTask))
    });
    
    component.editTask(updatedTask);
    expect(taskServiceMock.editTask).toHaveBeenCalledWith(updatedTask);
    expect(component.tasks()).toEqual([updatedTask]);
  });
  
  it('should delete a task', () => {
    const task: Task = {
      id: '5fsdf6',
      userId: 'gf885d',
      title: 'Task Title',
      description: 'Task Description',
      completed: false
    };
    
    matDialogMock.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of(true))
    });
    
    component.deleteTask(task);
    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(task.id);
    expect(component.tasks()).toEqual([task]);
  });
});
