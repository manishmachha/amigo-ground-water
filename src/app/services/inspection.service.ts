import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private baseUrl = `${environment.baseUrl}/inspections`;
  private http = inject(HttpClient);

  getInspectionsByApplication(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/application/${applicationId}`);
  }

  updateInspection(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }
}
