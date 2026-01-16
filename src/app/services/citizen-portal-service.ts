import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitizenProfileService {
  private baseurl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMyApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/noc`);
  }

  getGrievances() {
    return this.http.get(`${this.baseurl}/grievances`);
  }

  getDocuments() {
    return this.http.get(`${this.baseurl}/documents`);
  }

  personalInfo() {
    return this.http.get(`${this.baseurl}/users/profile`);
  }
}
