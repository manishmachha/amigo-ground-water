import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NocDashboardService {
  private readonly url = `${environment.baseUrl}/noc/stats`;

  http = inject(HttpClient);

  getDashboardStats() {
    return this.http.get<any>(this.url);
  }
}
