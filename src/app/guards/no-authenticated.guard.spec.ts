import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { NoAuthenticatedGuard } from './no-authenticated.guard';

describe('noLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => NoAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
