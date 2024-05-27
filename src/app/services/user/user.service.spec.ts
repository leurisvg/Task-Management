import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpUserService } from '../../interfaces/http-user-service.interface';
import { User } from '../../interfaces/users.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockHttpUserService: HttpUserService;
  const user: User = {
    id: 'fdd354',
    name: 'John Doe',
    email: 'email@example.com',
    password: 'password'
  };

  beforeEach(() => {
    mockHttpUserService = {
      getUsers: jest.fn().mockReturnValue(of([user])),
      addUser: jest.fn().mockReturnValue(of([user])),
      editUser: jest.fn().mockReturnValue(of([user])),
      deleteUser: jest.fn().mockReturnValue(of([user]))
    };
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should retrieve users', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([user]);
      expect(mockHttpUserService.getUsers).toHaveBeenCalled();
    });
  });
  
  it('should add new user', () => {
    service.addUser(user).subscribe(users => {
      expect(users).toEqual([user]);
      expect(mockHttpUserService.addUser).toHaveBeenCalledWith(users);
    });
  });
  
  it('should edit user', () => {
    service.editUser(user).subscribe(users => {
      expect(users).toEqual([user]);
      expect(mockHttpUserService.editUser).toHaveBeenCalledWith(users);
    });
  });
  
  it('should delete a user', () => {
    const id = 'fdd354';
    service.deleteUser(id).subscribe(users => {
      expect(users).toEqual([user]);
      expect(mockHttpUserService.deleteUser).toHaveBeenCalledWith(id);
    });
  });
});
