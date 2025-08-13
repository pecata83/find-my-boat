import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Map, Icon, Marker, TileLayer, LatLngExpression, LatLngTuple } from 'leaflet';
import { Boat } from '../../../../models';

interface MapLocation {
  lat: number;
  lng: number;
  name: string; // Optional name for the marker popup
}

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.html',
  styleUrls: ['./map-list.css']
})
export class MapList implements AfterViewInit, OnDestroy {
  private map!: Map;
  private seamapContours!: TileLayer.WMS;
  private markers: Marker[] = [];
  private boatsSub!: Subscription;

  @Input() boats$!: Observable<any>;
  // @Input() boats$!: Observable<Boat[]>;

  ngAfterViewInit(): void {
    const defaultIcon = new Icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });
    Marker.prototype.options.icon = defaultIcon;

    this.initMap();

    // Subscribe to boats$ and update markers
    if (this.boats$) {
      this.boatsSub = this.boats$.subscribe(boats => {
        const locations: MapLocation[] = boats
          .filter((b: any) => b.location)
          .map((b: any) => ({ lat: b.location.lat, lng: b.location.lng, name: b.name }));
        this.addMarkers(locations);
      });
    }
  }

  private initMap(): void {
    const osm = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    const initialCenter: LatLngTuple = [0, 0];

    this.map = new Map('map', {
      center: initialCenter,
      zoom: 3,
      layers: [osm],
      attributionControl: false
    });
  }

  private addMarkers(locations: MapLocation[]): void {
    // Clear existing markers
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    locations.forEach(loc => {
      const marker = new Marker([loc.lat, loc.lng], { draggable: false }).addTo(this.map);
      if (loc.name) {
        marker.bindTooltip(loc.name, { permanent: true, direction: 'top', offset: [0, -20] });
      }
      this.markers.push(marker);
    });

    if (locations.length) {
      this.map.setView([locations[0].lat, locations[0].lng], this.map.getZoom());
    }
  }

  ngOnDestroy(): void {
    this.boatsSub?.unsubscribe();
  }
}
