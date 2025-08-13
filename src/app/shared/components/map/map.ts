import {
  Component,
  AfterViewInit,
  forwardRef
} from '@angular/core';
import { Map, Icon, Marker, TileLayer, Control, LatLngExpression } from 'leaflet';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true
    }
  ]
})
export class MapComponent implements AfterViewInit, ControlValueAccessor {
  private map!: Map;
  private seamapContours!: TileLayer.WMS;
  private marker!: Marker;

  // ControlValueAccessor callbacks
  private onChange: (value: { lat: number; lng: number }) => void = () => { };
  private onTouched: () => void = () => { };

  private internalValue: { lat: number; lng: number } = {
    lat: 0,
    lng: 0
  };

  ngAfterViewInit(): void {
    const defaultIcon = new Icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });
    Marker.prototype.options.icon = defaultIcon;
    this.initMap();
  }

  private initMap(): void {
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
      center: [this.internalValue.lat, this.internalValue.lng],
      zoom: 8,
      layers: [osm],
      attributionControl: false
    });

    // Show/hide depth lines based on zoom level
    this.map.on('zoomend', () => {
      if (this.map.getZoom() >= 12) {
        if (!this.map.hasLayer(this.seamapContours)) {
          this.seamapContours.addTo(this.map);
        }
      } else {
        if (this.map.hasLayer(this.seamapContours)) {
          this.map.removeLayer(this.seamapContours);
        }
      }
    });

    // Draggable marker linked to form value
    this.marker = new Marker([this.internalValue.lat, this.internalValue.lng], { draggable: true }).addTo(this.map);
    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.internalValue = { lat: pos.lat, lng: pos.lng };
      this.onChange(this.internalValue);
      this.onTouched();
    });
  }

  // ControlValueAccessor methods
  writeValue(value: { lat: number; lng: number } | null): void {
    if (value) {
      this.internalValue = value;
      if (this.marker) {
        this.marker.setLatLng([value.lat, value.lng]);
        this.map.setView([value.lat, value.lng], this.map.getZoom());
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.marker) {
      this.marker.dragging?.[isDisabled ? 'disable' : 'enable']();
    }
  }
}
