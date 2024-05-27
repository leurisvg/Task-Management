import { Observable } from 'rxjs';
import { User, UserData } from './users.interface';

export interface HttpUserService {
  getUsers(): Observable<User[]>;
  addUser(user: User): Observable<User[]>;
  editUser(user: User): Observable<User[]>;
  deleteUser(id: string): Observable<User[]>;
}
