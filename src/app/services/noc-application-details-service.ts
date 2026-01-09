import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NocApplicationDetailsService {

  private baseUrl = 'http://13.200.126.121:3000/api/v1/noc'

  http= inject(HttpClient)

  nocApplicantDetails(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }

  nocApplicationDetailsTimeline(id: string){
    return this.http.get(`${this.baseUrl}/timeline/${id}`)
  }
  
}
