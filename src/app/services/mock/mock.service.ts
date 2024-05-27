import { inject, Injectable } from '@angular/core';
import { importJWK, SignJWT } from 'jose';
import { from, Observable, of, switchMap } from 'rxjs';
import { HttpAuthService } from '../../interfaces/http-auth-service.interface';
import { HttpTaskService } from '../../interfaces/http-task-service.interface';
import { HttpUserService } from '../../interfaces/http-user-service.interface';
import { Task } from '../../interfaces/task.interface';
import { User, UserData } from '../../interfaces/users.interface';
import { tasks } from '../../mock/tasks';
import { users } from '../../mock/users';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class MockService implements HttpAuthService, HttpUserService, HttpTaskService {
  #jwtService = inject(JwtService);
  #jwtKey = 'PRIVATE_KEY';
  public users: User[] = users;
  public tasks: Task[] = tasks;
  
  /**
   * Retrieves mock user data.
   */
  getUsers(): Observable<User[]> {
    return new Observable(subscriber => {
      subscriber.next(this.users);
    });
  }
  
  /**
   * Adds a mock user to the user list.
   */
  addUser(user: User): Observable<User[]> {
    return new Observable( subscriber => {
      this.users.push(user);
      subscriber.next(this.users);
    });
  }
  
  /**
   * Edits a mock user in the user list.
   */
  editUser(user: User): Observable<User[]> {
    return new Observable(subscriber => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users[index] = user;
      subscriber.next(this.users);
    });
  }
  
  /**
   * Deletes a mock user from the user list.
   */
  deleteUser(id: string): Observable<User[]> {
    return new Observable(subscriber => {
      this.users = this.users.filter(user => user.id !== id);
      subscriber.next(this.users);
    });
  }
  
  /**
   * Simulates user authentication by comparing the provided credentials with mock user data.
   * Generates a JWT upon successful authentication.
   */
  authenticateUser(email: string, password: string): Observable<UserData | null> {
    const user = this.users.find(user => user.email === email && user.password === password);
    
    if (!user) return of(null);
    
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    
    return from(this.generateJWT(userData)).pipe(
      switchMap(jwt => {
        return of({
          id: user!.id,
          email: user!.email,
          name: user!.name,
          jwt,
        });
      })
    )
  }
  
  /**
   * Simulates logout operation.
   * The logout is implemented in the client side.
   */
  logout(): void {
    // No operational
  }
  
  /**
   * Retrieves mock tasks associated with the currently authenticated user.
   */
  getUserTasks(): Observable<Task[]> {
    return new Observable(subscriber => {
      const user = this.getPayloadUser();
      
      if (!user) return subscriber.next([]);
      
      subscriber.next(this.tasks.filter(task => task.userId === user.id));
    });
  }
  
  /**
   * Adds a mock task associated with the currently authenticated user.
   */
  addTask(task: Task): Observable<Task[]> {
    return new Observable(subscriber => {
      const user = this.getPayloadUser();
      
      if (!user) return subscriber.next([]);
      
      this.tasks.push(task);
      this.tasks = this.tasks.filter(task => task.userId === user.id);
      subscriber.next(this.tasks);
    });
  }
  
  /**
   * Deletes a mock task associated with the currently authenticated user.
   */
  deleteTask(id: string): Observable<Task[]> {
    return new Observable(subscriber => {
      const user = this.getPayloadUser();
      
      if (!user) return subscriber.next([]);
      
      this.tasks = this.tasks.filter(task => task.id !== id);
      const userTasks = this.tasks.filter(task => task.userId === user.id);
      subscriber.next(userTasks);
    });
  }
  
  /**
   * Edits a mock task associated with the currently authenticated user.
   */
  editTask(task: Task): Observable<Task[]> {
    return new Observable(subscriber => {
      const user = this.getPayloadUser();
      
      if (!user) return subscriber.next([]);
      
      const index = this.tasks.findIndex(t => t.id === task.id);
      this.tasks[index] = task;
      const userTasks = this.tasks.filter(task => task.userId === user.id);
      subscriber.next(userTasks);
    });
  }
  
  /**
   * Generates a JWT token for the provided user data.
   */
  async generateJWT(user: { id: string, email: string, name: string }): Promise<string> {
    const key = await this.createKey();
    
    const jwt = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
    
    return jwt;
  }
  
  /**
   * Creates a cryptographic key from the JWT key.
   */
  async createKey() {
    const key = {
      kty: 'oct',
      k: btoa(this.#jwtKey)
    };
    
    return await importJWK(key, 'HS256');
  }
  
  /**
   * Retrieves the user data from the JWT payload.
   */
  getPayloadUser() {
    const payload = this.#jwtService.getPayload();
    
    if(!payload) return null;

    return payload['user'] as { id: string, email: string, name: string };
  }
}
