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
    MatCardModule,


  ],
  templateUrl: './noc-applications.html',
  styleUrl: './noc-applications.css',
})
export class NocApplications implements OnInit {

  nocService = inject(NocService);

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
    this.nocService.fetchNocs();

    /** signal effect – standalone inplace update */
    setInterval(() => {
      this.dataSource.data = this.nocService.nocs();
    }, 200);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isLoading(): boolean {
    return this.nocService.loading();
  }
}
