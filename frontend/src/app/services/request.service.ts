import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  checkUser(body: any) {
    return this.http.post(`${this.API_URL}/auth`, body);
  }

  createUser(body: any) {
    return this.http.post(`${this.API_URL}/create-user`, body);
  }

  checkExist(body: any) {
    return this.http.post(`${this.API_URL}/check-exit`, { username: body });
  }

  getAllDetails() {
    return this.http.get(`${this.API_URL}/get-details`);
  }
}
