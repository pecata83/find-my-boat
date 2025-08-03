import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { RouterLink } from '@angular/router';
import { BoatsService } from '../../core/services/boats.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  private authService = inject(AuthService);
  private boatsService = inject(BoatsService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;
  boats: any[] | null = null;


  ngOnInit() {
    this.boatsService.listBoats().subscribe(boats => {
      this.boats = boats;
      console.log("Boats loaded:", this.boats);
    });
  }
}
