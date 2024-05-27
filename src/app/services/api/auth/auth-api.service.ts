import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpAuthService } from '../../../interfaces/http-auth-service.interface';
import { UserData } from '../../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements HttpAuthService {
  #http = inject(HttpClient);
  #url = `${ environment.apiUrl }/auth`;
  
  /**
   * Authenticates a user by sending their email and password to the authentication API.
   */
  authenticateUser(email: string, password: string): Observable<UserData | null> {
    const body = {
      email,
      password,
    }
    
    return this.#http.post<UserData | null>(this.#url, body);
  }
  
  /**
   * Logs out the current user by sending a logout request to the authentication API.
   */
  logout(): Observable<void> {
    return this.#http.post<void>(`${ this.#url }/logout`, {});
  }
}
