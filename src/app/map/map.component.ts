import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
// @ts-ignore Excluding mapbox-gl from being transformed by existing loaders
import * as mapboxgl from '!mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {
  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v12';
  screenWidth = 0;
  zoom = 0;

  // Coordinates of the center of Spain
  lat = 40.41831;
  lng = -3.70275;

  constructor() {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;  

    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.publicToken,
      container: 'map',
      style: this.style,
      zoom: 6,
      center: [this.lng, this.lat],
    });

    this.map.addControl(
      new MapboxLanguage({
        defaultLanguage: 'es',
      })
    );

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    /*
    this.map.on('load', () => {
      this.map.addSource('radar', {
        type: 'image',
        url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        coordinates: [
          [-80.425, 46.437],
          [-71.516, 46.437],
          [-71.516, 37.936],
          [-80.425, 37.936],
        ],
      });
      this.map.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
        },
      });
            

    });
    */

    const southWest = new mapboxgl.LngLat(this.lng, this.lat);
    const northEast = new mapboxgl.LngLat(this.lng + 2, this.lat + 2);
    const boundingBox = new mapboxgl.LngLatBounds(southWest, northEast);
  }

  public addRadar() {
    this.map?.addSource('radar', {
      type: 'image',
      url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
      coordinates: [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936],
      ],
    });
    this.map?.addLayer({
      id: 'radar-layer',
      type: 'raster',
      source: 'radar',
      paint: {
        'raster-fade-duration': 0,
      },
    });
  }
}
