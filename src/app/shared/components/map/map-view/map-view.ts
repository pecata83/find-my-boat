import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Map, Icon, Marker, TileLayer, LatLngExpression } from 'leaflet';
import { Location } from '../../../../models';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css']
})
export class MapView implements AfterViewInit, OnChanges {
  @Input() location?: Location;
  private map?: Map;
  private seamapContours!: TileLayer.WMS;
  private marker?: Marker;

  ngAfterViewInit(): void {
    if (this.location) {
      this.initMap(this.location);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && this.map) {
      this.updateMarker(this.location);
    }
  }

  private initMap(loc: Location): void {
    const defaultIcon = new Icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [12, 41],
      popupAnchor: [0, -11],
      tooltipAnchor: [0, -11]
    });
    Marker.prototype.options.icon = defaultIcon;

    const osm = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    this.seamapContours = new TileLayer.WMS(
      'https://depth.openseamap.org/geoserver/openseamap/wms',
      {
        layers: 'openseamap:contour2,openseamap:contour',
        format: 'image/png',
        transparent: true,
        version: '1.1.0'
      }
    );

    this.map = new Map('map', {
      center: [loc.lat, loc.lng] as LatLngExpression,
      zoom: 14,
      layers: [osm],
      attributionControl: false
    });

    this.addMarker(loc);

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() >= 12) {
        if (!this.map!.hasLayer(this.seamapContours)) {
          this.seamapContours.addTo(this.map!);
        }
      } else {
        if (this.map!.hasLayer(this.seamapContours)) {
          this.map!.removeLayer(this.seamapContours);
        }
      }
    });
  }

  private addMarker(loc: Location): void {
    this.marker = new Marker([loc.lat, loc.lng]).addTo(this.map!);
    this.map!.setView([loc.lat, loc.lng]);
  }

  private updateMarker(loc?: Location): void {
    if (!loc) return;
    if (!this.marker) {
      this.addMarker(loc);
    } else {
      this.marker.setLatLng([loc.lat, loc.lng]);
      this.map!.setView([loc.lat, loc.lng]);
    }
  }
}
