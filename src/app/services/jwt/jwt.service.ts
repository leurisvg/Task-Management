import { Injectable } from '@angular/core';
import { decodeJwt, JWTPayload } from 'jose';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public jwt: string | null = null;
  
  /**
   * Retrieves the payload from the JWT if available.
   */
  getPayload(): JWTPayload | null {
    this.jwt = this.getJWT();
    
    if (this.jwt) {
      return decodeJwt(this.jwt);
    } else {
      return null;
    }
  }
  
  /**
   * Checks if the JWT is expired.
   */
  isJWTExpired(): boolean {
    const decodedJWT = this.getPayload();
    
    if (!decodedJWT) return true;
    
    const currentTime = Date.now() / 1000;
    return decodedJWT.exp! < currentTime;
  }
  
  /**
   * Sets the JWT in the local storage.
   */
  setJWT(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }
  
  /**
   * Retrieves the JWT from the local storage.
   */
  getJWT(): string | null {
    return localStorage.getItem('jwt');
  }
  
  /**
   * Removes the JWT from the local storage.
   */
  removeJWT(): void {
    localStorage.removeItem('jwt');
  }
}
