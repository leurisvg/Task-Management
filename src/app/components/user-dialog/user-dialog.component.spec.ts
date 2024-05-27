import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../../interfaces/users.interface';
import { UserDialogComponent } from './user-dialog.component';

jest.mock('../../utils/utils', () => ({
  generateId: jest.fn(() => 'gd695j'),
}));

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  let mockDialogRef: any;
  let mockDialogData: any;

  beforeEach(async () => {
    
    mockDialogRef = {
      close: jest.fn()
    };
    
    await TestBed.configureTestingModule({
      imports: [UserDialogComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  const user: User = {
    id: 'f5dfa9',
    name: 'John Doe',
    email: 'john@doe.com',
    password: '1234'
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with user data', () => {
    component.user = user;
    component.ngOnInit();
    expect(component.form.value).toEqual({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '1234'
    });
  });
  
  it('should save new user', () => {
    const { name, email, password } = user;
    component.user = null;
    component.form.setValue({ name, email, password });
    component.save();
    
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...user,
      id: 'gd695j',
    });
  });
  
  it('should update user', () => {
    component.user = user;
    component.form.setValue({
      email: 'john@smith.com',
      name: 'John Smith',
      password: '5678'
    });
    component.save();
    
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...user,
      email: 'john@smith.com',
      name: 'John Smith',
      password: '5678'
    });
  });
});
