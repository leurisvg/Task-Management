import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import LoginComponent from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    
    userServiceMock = {
      authenticateUser: jest.fn().mockReturnValue(of({ id: 'f334sc' }))
    };
    
    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should NOT authenticate when form is invalid', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });
    component.login();
    expect(userServiceMock.authenticateUser).not.toHaveBeenCalled();
  });
  
  it('should authenticate when form is valid', () => {
    component.loginForm.setValue({
      email: 'email@example.com',
      password: 'password'
    });
    component.login();
    expect(userServiceMock.authenticateUser).toHaveBeenCalledWith('email@example.com', 'password');
  });
});
