import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  timer,
  switchMap,
  retry,
  shareReplay,
  Subscription,
  tap,
  Subject,
  startWith,
  map,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
  type?: string;
  userId?: string;
  applicationId?: string | null;
  documentId?: string | null;
  inspectionId?: string | null;
  metadata?: any;
  link?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/notifications`;

  // Signals for state
  notifications = signal<Notification[]>([]);
  unreadCount = signal<number>(0);

  // Polling subscription
  private pollingSub: Subscription;
  private refresh$ = new Subject<void>();

  constructor() {
    // Start polling for unread count every 10 seconds
    this.pollingSub = timer(0, 10000)
      .pipe(
        switchMap(() => this.getUnreadCount()),
        retry({ delay: 5000 })
      )
      .subscribe({
        next: (count) => this.unreadCount.set(count),
        error: (err) => console.error('Notification polling error', err),
      });

    // Initial fetch of all notifications
    this.refreshNotifications();
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  // --- API Methods ---

  getAll() {
    return this.http
      .get<ApiResponse<{ notifications: Notification[]; total: number }>>(this.apiUrl)
      .pipe(map((response) => response.data.notifications));
  }

  getUnreadCount() {
    return this.http
      .get<ApiResponse<{ count: number }>>(`${this.apiUrl}/unread-count`)
      .pipe(map((response) => response.data.count));
  }

  markAsRead(id: string) {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}/read`, {}).pipe(
      tap(() => {
        this.updateLocalStateAsRead(id);
        this.refreshUnreadCount();
      })
    );
  }

  markAllAsRead() {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/read-all`, {}).pipe(
      tap(() => {
        this.notifications.update((list) => list.map((n) => ({ ...n, isRead: true })));
        this.unreadCount.set(0);
      })
    );
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.notifications.update((list) => list.filter((n) => n.id !== id));
        this.refreshUnreadCount();
      })
    );
  }

  // --- Helper Methods ---

  refreshNotifications() {
    this.getAll().subscribe({
      next: (data) => this.notifications.set(data),
      error: (err) => console.error('Failed to fetch notifications', err),
    });
  }

  private refreshUnreadCount() {
    this.getUnreadCount().subscribe((c) => this.unreadCount.set(c));
  }

  private updateLocalStateAsRead(id: string) {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }
}
