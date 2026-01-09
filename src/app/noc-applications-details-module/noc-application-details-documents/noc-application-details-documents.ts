import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NocDocument } from '../../models/noc-application-details-documents-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noc-application-details-documents',
  imports: [MatPaginator, MatSort, MatTableModule, CommonModule],
  templateUrl: './noc-application-details-documents.html',
  styleUrl: './noc-application-details-documents.css',
})
export class NocApplicationDetailsDocuments {

   displayedColumns: string[] = ['documentName', 'status', 'uploadDate', 'size', 'actions'];

  dataSource = new MatTableDataSource<NocDocument>([
    {
      documentName: 'Land Ownership Document',
      status: 'VERIFIED',
      uploadDate: '10/2/2024',
      size: '2.3 MB'
    },
    {
      documentName: 'Site Plan & Layout',
      status: 'VERIFIED',
      uploadDate: '10/2/2024',
      size: '4.1 MB'
    },
    {
      documentName: 'Environmental Clearance',
      status: 'PENDING',
      uploadDate: '10/2/2024',
      size: '1.8 MB'
    },
    {
      documentName: 'Building Plan Approval',
      status: 'VERIFIED',
      uploadDate: '10/2/2024',
      size: '3.2 MB'
    },
    {
      documentName: 'Power Feasibility NOC',
      status: 'NOT_UPLOADED',
      uploadDate: null,
      size: null
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPreview(row: NocDocument) {
    console.log('preview', row);
  }

  onDownload(row: NocDocument) {
    console.log('download', row);
  }

  getStatusClass(status: string) {
    if (status === 'VERIFIED') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'PENDING') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  }

}
