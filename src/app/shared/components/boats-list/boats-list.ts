import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BoatsService } from '../../../core/services/boats.service';
import { AuthService } from '../../../core/services';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-boats-list',
  imports: [AsyncPipe, RouterLink, TitleCasePipe],
  templateUrl: './boats-list.html',
  styleUrl: './boats-list.css'
})
export class BoatsList implements OnInit, OnDestroy {
  @Input() myBoats: boolean = false;
  private authService = inject(AuthService);
  private boatsService = inject(BoatsService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;
  boats: any[] | null = null;
  boats$ = this.boatsService.boats$;

  ngOnInit() {
    if (this.myBoats) {
      this.boatsService.startObservingMyBoats({ userId: this.currentUser()?.id || "" });
      return;
    } else {
      this.boatsService.startObservingBoats();
    }
  }

  ngOnDestroy() {
    this.boatsService.subscription?.unsubscribe();
  }

  onEditBoat(id: string) {
    console.log('Edit boat with id:', id);
  }

  onDeleteBoat(id: string) {
    if (confirm('Are you sure you want to delete this boat?')) {
      this.boatsService.deleteBoat(id).subscribe({
        next: () => {
        },
        error: (err) => {
          alert('Failed to delete boat.');
          console.error(err);
        }
      });
    }
  }
}
