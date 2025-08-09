import { Component, inject } from '@angular/core';
import { BoatsService } from '../../core/services/boats.service';
import { Boat } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boats',
  imports: [],
  templateUrl: './boats.html',
  styleUrl: './boats.css'
})
export class Boats {
  private boatsService = inject(BoatsService);
  private router = inject(Router);
  boat: Boat | null = null;

  boatId = this.router.routerState.snapshot.root.firstChild?.params['boatId'];

  ngOnInit() {
    if (this.boatId) {
      this.boatsService.getBoat(this.boatId).subscribe((boat: Boat | null) => {
        if (boat) {
          this.boat = boat;
        }
      });
    }
  }
}
