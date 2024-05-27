import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUserService } from '../../../interfaces/http-user-service.interface';
import { User } from '../../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements HttpUserService {
  #http = inject(HttpClient);
  #url = `${ environment.apiUrl }/users`;
  
  /**
   * Retrieves users from the users API.
   */
  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#url);
  }
  
  /**
   * Adds a new user.
   */
  addUser(user: User): Observable<User[]> {
    const body = {
      ...user
    }
    
    return this.#http.post<User[]>(this.#url, body);
  }
  
  /**
   * Edits an existing user.
   */
  editUser(user: User): Observable<User[]> {
    const body = {
      ...user
    }
    
    return this.#http.put<User[]>(this.#url, body);
  }
  
  /**
   * Deletes a user.
   */
  deleteUser(id: string): Observable<User[]> {
    return this.#http.delete<User[]>(`${this.#url }/${ id }`);
  }
}
