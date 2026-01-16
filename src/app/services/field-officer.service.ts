import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FieldOfficerService {
  private baseurl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMyInspections(): Observable<any> {
    // The backend filters by assignedToId = user.id for FIELD_OFFICER
    return this.http.get<any>(`${this.baseurl}/noc`);
  }
}
