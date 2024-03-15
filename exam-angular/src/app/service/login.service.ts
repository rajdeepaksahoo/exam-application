import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:9000"
  getToken(tokenCredentials:any){
    return this.http.post(`${this.baseUrl}/token`,tokenCredentials)
  }

  register(registerCredentials:any){
    return this.http.post(`${this.baseUrl}/register`,registerCredentials)
  }
  
}
