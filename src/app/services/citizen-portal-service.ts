import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitizenProfileService {

  private baseurl = 'http://13.200.126.121:3000/api/v1';
  
  constructor(private http: HttpClient) {}

 getMyApplications(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseurl}/users/user-applications`);
}

getGrievances(){
  return this.http.get(`${this.baseurl}/grievances`);
}


  personalInfo(){
    return this.http.get(`${this.baseurl}/users/profile`)
  } 
}
