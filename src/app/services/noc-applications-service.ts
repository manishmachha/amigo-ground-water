import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NocService {
  private http = inject(HttpClient);

  private URL = `${environment.baseUrl}/noc`;

  getNocApplications() {
    return this.http.get<any[]>(`${this.URL}`);
  }
}
