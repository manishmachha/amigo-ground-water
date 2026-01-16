import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NocApplicationDetailsService {
  private baseUrl = `${environment.baseUrl}/noc`;
  private documentsUrl = `${environment.baseUrl}/documents`;

  http = inject(HttpClient);

  // Signal to hold the current application details shared across tabs
  currentApplication = signal<any>(null);

  nocApplicantionDetails(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  verifyDocument(id: string, isVerified: boolean) {
    return this.http.patch(`${this.documentsUrl}/${id}`, { isVerified });
  }

  nocApplicationDetailsTimeline(id: string) {
    return this.http.get(`${this.baseUrl}/timeline/${id}`);
  }

  submitNocApplication(id: string) {
    return this.http.patch(`${this.baseUrl}/${id}/submit`, {});
  }

  performAction(id: string, actionKey: string, payload: any = {}, remarks: string = '') {
    return this.http.post(`${this.baseUrl}/${id}/action`, {
      actionKey,
      payload,
      remarks,
    });
  }
}
