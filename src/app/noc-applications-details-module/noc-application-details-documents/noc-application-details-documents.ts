import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ViewChild, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { NocDocument } from '../../models/noc-application-details-documents-model';

type StatusFilter = 'ALL' | 'VERIFIED' | 'PENDING';

@Component({
  selector: 'app-noc-application-details-documents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
  ],
  templateUrl: './noc-application-details-documents.html',
  styleUrl: './noc-application-details-documents.css',
})
export class NocApplicationDetailsDocuments implements AfterViewInit {
  displayedColumns: string[] = ['name', 'type', 'isVerified', 'createdAt', 'fileSize', 'actions'];

  nocApplicationService = inject(NocApplicationDetailsService);
  private destroyRef = inject(DestroyRef);

  dataSource = new MatTableDataSource<NocDocument>([]);

  availableTypes: string[] = [];

  // Filters
  searchCtrl = new FormControl<string>('', { nonNullable: true });
  typeCtrl = new FormControl<string>('ALL', { nonNullable: true });
  statusCtrl = new FormControl<StatusFilter>('ALL', { nonNullable: true });
  minSizeCtrl = new FormControl<number | null>(null);
  maxSizeCtrl = new FormControl<number | null>(null);
  fromDateCtrl = new FormControl<Date | null>(null);
  toDateCtrl = new FormControl<Date | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    //  Filter predicate (SEARCH + TYPE + STATUS + DATE RANGE + SIZE RANGE)
    this.dataSource.filterPredicate = (row, filterStr) => {
      const f = JSON.parse(filterStr || '{}') as {
        q?: string;
        type?: string;
        status?: StatusFilter;
        min?: number | null;
        max?: number | null;
        from?: string | null;
        to?: string | null;
      };

      const q = (f.q || '').trim().toLowerCase();

      const name = (row.name || '').toLowerCase();
      const fileName = (row.fileName || '').toLowerCase();
      const type = (row.type || '').toLowerCase();
      const statusText = row.isVerified ? 'verified' : 'pending';
      const size = Number(row.fileSize) || 0;

      const createdAtDate = row.createdAt ? new Date(row.createdAt as any) : null;
      const createdAtStr = createdAtDate
        ? `${String(createdAtDate.getDate()).padStart(2, '0')}/${String(
            createdAtDate.getMonth() + 1
          ).padStart(2, '0')}/${createdAtDate.getFullYear()}`
        : '';

      // Global search across "all kinds"
      const matchesSearch =
        !q ||
        name.includes(q) ||
        fileName.includes(q) ||
        type.includes(q) ||
        statusText.includes(q) ||
        createdAtStr.includes(q) ||
        String(size).includes(q);

      // Type filter
      const matchesType = !f.type || f.type === 'ALL' || row.type === f.type;

      // Status filter
      const matchesStatus =
        !f.status ||
        f.status === 'ALL' ||
        (f.status === 'VERIFIED' && row.isVerified) ||
        (f.status === 'PENDING' && !row.isVerified);

      // Size range
      const matchesSizeMin = f.min == null || size >= f.min;
      const matchesSizeMax = f.max == null || size <= f.max;

      // Date range
      const from = f.from ? new Date(f.from) : null;
      const to = f.to ? new Date(f.to) : null;

      const matchesFrom = !from || (createdAtDate ? createdAtDate >= from : false);
      const matchesTo = !to || (createdAtDate ? createdAtDate <= to : false);

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesSizeMin &&
        matchesSizeMax &&
        matchesFrom &&
        matchesTo
      );
    };

    //  Proper numeric/date sorting
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'createdAt':
          return item.createdAt ? new Date(item.createdAt as any).getTime() : 0;
        case 'fileSize':
          return Number(item.fileSize) || 0;
        case 'isVerified':
          return item.isVerified ? 1 : 0;
        case 'name':
          return `${item.name || ''} ${item.fileName || ''}`.toLowerCase();
        default:
          return ((item as any)[property] ?? '').toString().toLowerCase();
      }
    };

    // Load docs from signal/service
    effect(() => {
      const appData = this.nocApplicationService.currentApplication();
      const docs = (appData?.documents ?? []) as NocDocument[];
      this.dataSource.data = docs;

      // Build dynamic types list
      this.availableTypes = Array.from(
        new Set(docs.map((d) => d.type).filter((t): t is string => !!t))
      ).sort();

      // Re-apply filter (keeps UI consistent)
      this.applyCompositeFilter();
    });

    // React to filter changes
    merge(
      this.searchCtrl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()),
      this.typeCtrl.valueChanges,
      this.statusCtrl.valueChanges,
      this.minSizeCtrl.valueChanges,
      this.maxSizeCtrl.valueChanges,
      this.fromDateCtrl.valueChanges,
      this.toDateCtrl.valueChanges
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applyCompositeFilter());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Counts
  get totalCount() {
    return this.dataSource.data.length;
  }
  get verifiedCount() {
    return this.dataSource.data.filter((d) => d.isVerified).length;
  }
  get pendingCount() {
    return this.totalCount - this.verifiedCount;
  }

  get hasAnyFilter(): boolean {
    return !!(
      this.searchCtrl.value?.trim() ||
      this.typeCtrl.value !== 'ALL' ||
      this.statusCtrl.value !== 'ALL' ||
      this.minSizeCtrl.value != null ||
      this.maxSizeCtrl.value != null ||
      this.fromDateCtrl.value != null ||
      this.toDateCtrl.value != null
    );
  }

  setStatus(s: StatusFilter) {
    this.statusCtrl.setValue(s);
  }

  clearFilters() {
    this.searchCtrl.setValue('');
    this.typeCtrl.setValue('ALL');
    this.statusCtrl.setValue('ALL');
    this.minSizeCtrl.setValue(null);
    this.maxSizeCtrl.setValue(null);
    this.fromDateCtrl.setValue(null);
    this.toDateCtrl.setValue(null);
  }

  private applyCompositeFilter() {
    const payload = {
      q: this.searchCtrl.value?.trim().toLowerCase() || '',
      type: this.typeCtrl.value || 'ALL',
      status: this.statusCtrl.value || 'ALL',
      min: this.minSizeCtrl.value,
      max: this.maxSizeCtrl.value,
      from: this.fromDateCtrl.value ? this.startOfDayISO(this.fromDateCtrl.value) : null,
      to: this.toDateCtrl.value ? this.endOfDayISO(this.toDateCtrl.value) : null,
    };

    this.dataSource.filter = JSON.stringify(payload);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private startOfDayISO(d: Date): string {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x.toISOString();
  }

  private endOfDayISO(d: Date): string {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x.toISOString();
  }

  onPreview(row: NocDocument) {
    if (row.url) window.open(row.url, '_blank');
  }

  onDownload(row: NocDocument) {
    if (row.url) window.open(row.url, '_blank');
  }

  toggleDocumentVerification(row: NocDocument) {
    const previousState = row.isVerified;
    const newState = !previousState;

    row.isVerified = newState; // optimistic

    this.nocApplicationService.verifyDocument(row.id, newState).subscribe({
      next: () => console.log(newState ? 'Document verified' : 'Document unverified'),
      error: (err) => {
        console.error('Verification toggle failed', err);
        row.isVerified = previousState;
      },
    });
  }

  requestClarification() {
    const remarks = prompt('Enter clarification remarks (e.g., Please attach land documents):');
    if (!remarks) return;

    const appId = this.nocApplicationService.currentApplication()?.id;
    if (!appId) return;

    this.nocApplicationService
      .performAction(appId, 'REQUEST_CLARIFICATION', {}, remarks)
      .subscribe({
        next: () => alert('Clarification requested successfully'),
        error: (err) => console.error('Failed to request clarification', err),
      });
  }
}
