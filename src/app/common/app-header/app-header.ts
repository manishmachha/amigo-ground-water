import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, RouterModule, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
})
export class AppHeader implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  title = signal<string>('');
  description = signal<string>('');
  showHeader = signal<boolean>(true);
  unreadCount = this.notificationService.unreadCount;

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data: Data) => {
        this.title.set(data['title'] || '');
        this.description.set(data['description'] || '');
        this.showHeader.set(data['hideHeader'] !== true);
      });
  }
}
