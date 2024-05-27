import { Observable } from 'rxjs';
import { UserData } from './users.interface';

export interface HttpAuthService {
  authenticateUser(email: string, password: string): Observable<UserData | null>;
  logout(): void;
}
