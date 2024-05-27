import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerMock: any;
  let userServiceMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn()
    };
    
    userServiceMock = {
      logout: jest.fn()
    };
    
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should navigate to "users" when isTaskPage is true', () => {
    component.isTaskPage.set(true);
    fixture.detectChanges();
    expect(routerMock.navigate).toHaveBeenCalledWith(['users']);
  });
  
  it('should navigate to "tasks" when isTaskPage is false', () => {
    component.isTaskPage.set(false);
    fixture.detectChanges();
    expect(routerMock.navigate).toHaveBeenCalledWith(['tasks']);
  });
  
  it('should toggle isTaskPage value when changePage is called', () => {
    const initialValue = component.isTaskPage();
    component.changePage();
    expect(component.isTaskPage()).toBe(!initialValue);
  });
  
  it('should call logout and navigate to "login" when logout is called', () => {
    component.logout();
    expect(userServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });
});
