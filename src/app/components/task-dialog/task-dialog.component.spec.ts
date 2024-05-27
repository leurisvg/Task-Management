import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Task } from '../../interfaces/task.interface';
import { UserService } from '../../services/user/user.service';
import { TaskDialogComponent } from './task-dialog.component';

jest.mock('../../utils/utils', () => ({
  generateId: jest.fn(() => '4gzbi3'),
}));

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let mockDialogRef: any;
  let mockDialogData: any;
  let userServiceMock: any;

  beforeEach(async () => {
    
    mockDialogRef = {
      close: jest.fn()
    };
    
    userServiceMock = {
      getUser: jest.fn().mockReturnValue({ id: 'k523fs' })
    };
    
    await TestBed.configureTestingModule({
      imports: [TaskDialogComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: UserService, useValue: userServiceMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  const task: Task = {
    id: 'kl44os',
    userId: '42j4ua',
    title: 'Task Title',
    description: 'Task Description',
    completed: true
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with task data', () => {
    component.task = task;
    component.ngOnInit();
    expect(component.form.value).toEqual({
      title: 'Task Title',
      description: 'Task Description',
      completed: true
    });
  });
  
  it('should save new task', () => {
    const { title, description, completed } = task;
    component.task = null;
    component.form.setValue({ title, description, completed });
    component.save();
    
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...task,
      id: '4gzbi3',
      userId: 'k523fs',
    });
  });
  
  it('should update task', () => {
    component.task = task;
    component.form.setValue({
      title: 'Updated Title',
      description: 'Updated Description',
      completed: false
    });
    component.save();
    
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...task,
      title: 'Updated Title',
      description: 'Updated Description',
      completed: false,
    });
  });
});
