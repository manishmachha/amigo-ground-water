import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signal } from '@angular/core';
import { Noc } from '../models/district-officer-model';


interface ApiResponse {
  success: boolean;
  message: string;
  data: Noc[];
}

@Injectable({
  providedIn: 'root'
})
export class NocService {

  private http = inject(HttpClient);

  private URL = 'http://13.200.126.121:3000/api/v1/noc';

  nocs = signal<Noc[]>([]);
  loading = signal(false);

  fetchNocs(): void {
    this.loading.set(true);

    this.http.get<ApiResponse>(this.URL).subscribe({
      next: (res) => {
        this.nocs.set(res.data);   
        this.loading.set(false);
      },
      error: () => {
        this.nocs.set([]);
        this.loading.set(false);
      }
    });
  }
}
