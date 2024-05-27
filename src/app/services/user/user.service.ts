import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpAuthService } from '../../interfaces/http-auth-service.interface';
import { HttpUserService } from '../../interfaces/http-user-service.interface';
import { User, UserData } from '../../interfaces/users.interface';
import { AuthApiService } from '../api/auth/auth-api.service';
import { UserApiService } from '../api/user/user-api.service';
import { JwtService } from '../jwt/jwt.service';
import { MockService } from '../mock/mock.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpUserService: HttpUserService;
  private httpAuthService: HttpAuthService;
  #jwtService = inject(JwtService);
  #user: UserData | null = null;
  
  /**
   * Dynamically selects the appropriate HTTP user and authentication services based on the environment configuration.
   * If the environment is set to development, MockService is used for mocking purposes.
   * Otherwise, the actual API services (UserApiService and AuthApiService) are injected.
   */
  constructor() {
    if (environment.development) {
      this.httpUserService = inject(MockService);
      this.httpAuthService = inject(MockService);
    } else {
      this.httpUserService = inject(UserApiService);
      this.httpAuthService = inject(AuthApiService);
    }
  }
  
  /**
   * Retrieves all users.
   */
  getUsers(): Observable<User[]> {
    return this.httpUserService.getUsers();
  }
  
  /**
   * Authenticates a user with the provided credentials.
   * Sets the JWT in the JwtService upon successful authentication and loads user data.
   */
  authenticateUser(email: string, password: string): Observable<UserData | null> {
    return this.httpAuthService.authenticateUser(email, password)
      .pipe(
        tap((user) => {
          this.#jwtService.setJWT(user!.jwt);
          this.loadUser();
        })
      );
  }
  
  /**
   * Logs out the current user by removing user data and the JWT.
   */
  logout(): void {
    this.#user = null;
    this.#jwtService.removeJWT();
  }
  
  /**
   * Retrieves the currently authenticated user data.
   */
  getUser(): UserData | null {
    return this.#user;
  }
  
  /**
   * Adds a new user.
   */
  addUser(user: User): Observable<User[]> {
    return this.httpUserService.addUser(user);
  }
  
  /**
   * Edits an existing user.
   */
  editUser(user: User): Observable<User[]> {
    return this.httpUserService.editUser(user);
  }
  
  /**
   * Deletes a user.
   */
  deleteUser(id: string): Observable<User[]> {
    return this.httpUserService.deleteUser(id);
  }
  
  /**
   * Loads user data from the JWT payload.
   */
  loadUser(): void {
    const payload = this.#jwtService.getPayload();
    if(!payload) return;
    
    const user = payload['user'] as { id: string, email: string, name: string };
    const jwt = this.#jwtService.getJWT()?? '';
    this.#user = {...user, jwt}
  }
  
  /**
   * Checks if the current session is valid by verifying the presence of user data and the JWT expiration.
   * @returns True if the session is valid, false if the session is expired or no user data is available, null if not determined.
   */
  isSessionValid(): boolean | null {
    return this.getUser() && !this.#jwtService.isJWTExpired();
  }
}
