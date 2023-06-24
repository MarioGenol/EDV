import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
// @ts-ignore Excluding mapbox-gl from being transformed by existing loaders
import * as mapboxgl from '!mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Building, Feature } from 'server/export';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	map?: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/light-v11';
	features: Feature[] = [];

	// Center Point
	lng = 146.85154486433777;
	lat = -36.11139140897592;

	constructor(private http: HttpClient, private elementRef: ElementRef) { }

	loadMapData() {
		this.http.get<Building[]>(`${environment.backendURL}/buildings`).subscribe(response => {
			for (let i = 0; i < response.length; i++) {
				let coordinates = response[i].coordinates as unknown as [number[]];
				this.features.push({
					type: 'Feature',
					properties: {
						description: `<strong>${response[i].name}</strong><p>Campus ${response[i].campus}</p><p><a style="color: green" href="chart/${response[i].id}">Chart</a></p>`,
						color: '#232323'
					},
					geometry: {
						type: 'Point',
						// @ts-ignore
						coordinates: [coordinates.coordinates[0], coordinates.coordinates[1]]
					}
				});
			}

			this.map.on('load', () => {
				this.map.addSource('places', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: this.features
					},
				});
	
				this.map.addLayer({
					id: 'places',
					source: 'places',
					type: 'circle',
					paint: {
						'circle-color': '#4264fb',
						'circle-radius': 8,
						'circle-stroke-width': 2,
						'circle-stroke-color': '#ffffff'
					}
				});
	
				this.map.on('click', 'places', (e: any) => {
					new mapboxgl.Popup()
						.setLngLat(e.lngLat)
						.setHTML(e.features[0].properties.description)
						.addTo(this.map);
				});
	
				this.map.on('mouseenter', 'places', () => {
					// Change the cursor style as a UI indicator.
					this.map.getCanvas().style.cursor = 'pointer';
				});
	
				this.map.on('mouseleave', 'places', () => {
					this.map.getCanvas().style.cursor = '';
				});
			});
		})
	}

	ngOnInit() {
		mapboxgl as typeof mapboxgl;
		this.map = new mapboxgl.Map({
			accessToken: environment.mapbox.publicToken,
			container: 'map',
			style: this.style,
			zoom: 15,
			center: [this.lng, this.lat],
		});

		this.loadMapData();
	}
}
