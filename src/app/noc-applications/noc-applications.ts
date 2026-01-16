import { Component, OnInit, ViewChild, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OneOrMany } from '@angular/forms/signals';
import { NocService } from '../services/noc-applications-service';
import { Noc } from '../models/district-officer-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-noc-applications',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule, RouterLink],
  templateUrl: './noc-applications.html',
  styleUrl: './noc-applications.css',
})
export class NocApplications implements OnInit {

  nocService = inject(NocService);
  nocApplication = signal<any[]>([]);

  displayedColumns = signal<string[]>([
    'appId',
    'nocNo',
    'projectName',
    'category',
    'type',
    'location',
    'watershed',
    'qty',
    'status',
    'actions'
  ]);



  dataSource = new MatTableDataSource<Noc>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
   this.loadApplicantData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadApplicantData() {
  this.nocService.getNocApplications().subscribe({
    next: (res: any) => {
      console.log('API response:', res);

      // THIS IS THE KEY LINE
      this.dataSource.data = res.data;

      // optional signal (if you need elsewhere)
      this.nocApplication.set(res.data);
    },
    error: (err) => {
      console.error('Failed to load applications', err);
    }
  });
}

}
