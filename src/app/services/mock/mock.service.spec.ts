import { TestBed } from '@angular/core/testing';
import { User } from '../../interfaces/users.interface';

import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('getUsers', () => {
    it('should return an observable of users', (done) => {
      service.getUsers().subscribe((users: User[]) => {
        expect(users).toEqual(service.users);
        done();
      });
    });
  });
});
