import { Component, inject } from '@angular/core';
import { BoatsService } from '../../core/services';
import { MapList } from '../../shared/components/map/map-list/map-list';

@Component({
  selector: 'app-boats-map',
  imports: [MapList],
  templateUrl: './boats-map.html',
  styleUrl: './boats-map.css'
})
export class BoatsMap {
  private boatsService = inject(BoatsService);
  boats$ = this.boatsService.boats$;

  ngOnInit() {
    this.boatsService.startObservingBoats();
  }

}
