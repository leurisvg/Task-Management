import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';

import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService]
    });
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get users', () => {
    const user = {
      id: 'fdd354',
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password'
    };
    
    service.getUsers().subscribe((users) => {
      expect(users).toEqual([user]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/users`);
    expect(req.request.method).toBe('GET');
    
    req.flush([user]);
  });
  
  it('should add user', () => {
    const user = {
      id: 'fdd354',
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password'
    };
    
    service.addUser(user).subscribe((users) => {
      expect(users).toEqual([user]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    
    req.flush([user]);
  });
  
  it('should edit user', () => {
    const user = {
      id: 'fdd354',
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password'
    };
    
    service.editUser(user).subscribe((users) => {
      expect(users).toEqual([user]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/users`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(user);
    
    req.flush([user]);
  });
  
  it('should delete user', () => {
    const user = {
      id: 'fdd354',
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password'
    };
    
    service.deleteUser(user.id).subscribe((users) => {
      expect(users).toEqual([user]);
    });
    
    const req = httpMock.expectOne(`${ environment.apiUrl }/users/fdd354`);
    expect(req.request.method).toBe('DELETE');
    
    req.flush([user]);
  });
});
