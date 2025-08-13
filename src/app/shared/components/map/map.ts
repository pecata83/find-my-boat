import {
  Component,
  AfterViewInit,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Map, Icon, Marker, TileLayer, Circle } from 'leaflet';
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
export class MapComponent implements AfterViewInit, ControlValueAccessor, OnChanges {
  @Input() anchorRadius: number = 500;

  private map!: Map;
  private seamapContours!: TileLayer.WMS;
  private marker!: Marker;
  private anchorCircle!: Circle;
  private zoomLevel: number = 14;

  // ControlValueAccessor callbacks
  private onChange = (_: any) => { };
  private onTouched = () => { };

  private internalValue: { lat: number; lng: number } = {
    lat: 0,
    lng: 0
  };

  ngAfterViewInit(): void {
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
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anchorRadius'] && this.anchorCircle) {
      this.anchorCircle.setRadius(this.anchorRadius);
    }
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
      zoom: this.zoomLevel,
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

    // Marker
    this.marker = new Marker([this.internalValue.lat, this.internalValue.lng], { draggable: true }).addTo(this.map);

    // Anchor radius circle
    this.anchorCircle = new Circle([this.internalValue.lat, this.internalValue.lng], {
      radius: this.anchorRadius,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.15
    }).addTo(this.map);

    // Update marker + circle on drag
    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.internalValue = { lat: pos.lat, lng: pos.lng };
      this.anchorCircle.setLatLng(pos);
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
        this.anchorCircle.setLatLng([value.lat, value.lng]);
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
