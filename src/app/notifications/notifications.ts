import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
})
export class Notifications implements OnInit {
  notificationService = inject(NotificationService);

  filter = signal<'ALL' | 'UNREAD'>('ALL');

  notifications = this.notificationService.notifications;

  filteredNotifications = computed(() => {
    const list = this.notifications();
    if (this.filter() === 'UNREAD') {
      return list.filter((n) => !n.isRead);
    }
    return list;
  });

  ngOnInit() {
    // Refresh on load
    this.notificationService.refreshNotifications();
  }

  markAsRead(id: string, event: Event) {
    event.stopPropagation();
    this.notificationService.markAsRead(id).subscribe();
  }

  deleteNotification(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationService.delete(id).subscribe();
    }
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe();
  }

  setFilter(f: 'ALL' | 'UNREAD') {
    this.filter.set(f);
  }

  getTimeAgo(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return Math.floor(seconds) + ' seconds ago';
  }

  getIconColor(type: string | undefined): string {
    switch (type) {
      case 'WARNING':
      case 'MISSING_DOCUMENTS':
        return 'text-amber-500 bg-amber-50';
      case 'ERROR':
        return 'text-red-500 bg-red-50';
      case 'SUCCESS':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-blue-500 bg-blue-50'; // INFO
    }
  }

  getIconClass(type: string | undefined): string {
    switch (type) {
      case 'WARNING':
        return 'bi-exclamation-triangle';
      case 'MISSING_DOCUMENTS':
        return 'bi-file-earmark-text';
      case 'ERROR':
        return 'bi-x-circle';
      case 'SUCCESS':
        return 'bi-check-circle';
      default:
        return 'bi-info-circle';
    }
  }
}
