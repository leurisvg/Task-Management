import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { User } from '../../interfaces/users.interface';
import { UserService } from '../../services/user/user.service';
import UsersComponent from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let matDialogMock: any;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getUsers: jest.fn().mockReturnValue(of([{ id: 'fdd354', name: 'John Doe', email: 'email@example.com', password: 'password' }])),
      addUser: jest.fn().mockReturnValue(of([{ id: 'fdd354', name: 'John Doe', email: 'email@example.com', password: 'password' }])),
      editUser: jest.fn().mockReturnValue(of([{ id: 'fdd354', name: 'John Smith', email: 'email@example.com', password: 'password' }])),
      deleteUser: jest.fn().mockReturnValue(of([{ id: 'fdd354', name: 'John Doe', email: 'email@example.com', password: 'password' }])),
    };
    
    matDialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(null))
      })
    };
    
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it ('should add new user', () => {
    const newUser: User = {
      id: 'fdd354',
      email: 'email@example.com',
      name: 'John Doe',
      password: 'password',
    };
    
    matDialogMock.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of(newUser))
    });
    
    component.addUser();
    
    expect(userServiceMock.addUser).toHaveBeenCalledWith(newUser);
    expect(component.users()).toEqual([{
      id: 'fdd354',
      email: 'email@example.com',
      name: 'John Doe',
      password: 'password',
    }]);
  });
  
  it('should edit user', () => {
    const updatedUser: User = {
      id: 'fdd354',
      name: 'John Smith',
      email: 'email@example.com',
      password: 'password'
    };
    
    matDialogMock.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of(updatedUser))
    });
    
    component.editUser(updatedUser);
    expect(userServiceMock.editUser).toHaveBeenCalledWith(updatedUser);
    expect(component.users()).toEqual([updatedUser]);
  });
  
  it('should delete a user', () => {
    const user: User = {
      id: 'fdd354',
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password'
    };
    
    matDialogMock.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of(true))
    });
    
    component.deleteUser(user);
    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(user.id);
    expect(component.users()).toEqual([user]);
  });
});
