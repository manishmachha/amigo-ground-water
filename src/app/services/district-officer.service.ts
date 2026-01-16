import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DistrictOfficerService {
  private baseurl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/noc/stats`);
  }

  getPendingTasks(): Observable<any> {
    // The backend filters by role automatically
    return this.http.get<any>(`${this.baseurl}/noc`);
  }
}
