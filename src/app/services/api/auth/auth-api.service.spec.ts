import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService]
    });
    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should authenticate user', () => {
    const user = {
      id: 'fdd354',
      name: 'John Doe',
      email: 'email@example.com',
    };
    const email = 'email@example.com';
    const password = 'password';
    
    service.authenticateUser(email, password).subscribe((userData) => {
      expect(userData).toEqual(user);
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}/auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    
    req.flush(user);
  });
  
  it('logout', () => {
    service.logout().subscribe((response) => {
      expect(response).toBeUndefined();
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}/auth/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    
    req.flush({});
  });
});
