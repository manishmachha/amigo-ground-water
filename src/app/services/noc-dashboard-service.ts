import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class NocDashboardService {

  private readonly url = 'http://13.200.126.121:3000/api/v1/noc/stats';

    http = inject(HttpClient);

  getDashboardStats() {
     return this.http.get<any>(this.url);
  }
}