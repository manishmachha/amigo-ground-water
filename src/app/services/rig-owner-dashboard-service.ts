import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RigOwnerDashboardService {

  http = inject(HttpClient);

  private baseUrl = 'http://13.200.126.121:3000/api/v1'


  getAllRigDocuments() {
    return this.http.get<any[]>(`${this.baseUrl}/rigs`);
  }

  rigOwneruserProfile(){
    return this.http.get<any[]>(`${this.baseUrl}/users/profile`);
  }

  drillingLogsInfo(){
    return this.http.get<any[]>(`${this.baseUrl}/rig-movements/completed`)

  }
}
