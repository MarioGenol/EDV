import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
// @ts-ignore Excluding mapbox-gl from being transformed by existing loaders
import * as mapboxgl from '!mapbox-gl';
import { environment } from 'src/environments/environment';
import { ChartComponent } from '../chart/chart.component';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	map?: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/light-v11';

	// Center Point
	lng = -3.598955;
	lat = 37.178404;


	constructor(private http: HttpClient) { }

	loadMapData() {
		this.http.get<any>(`${environment.backendURL}/map/`).subscribe(response => {
			for (let i = 0; i < response.length; i++) {

			}
		})

		let temp = [
			{
				type: 'Feature',
				properties: {
					description: '<strong>dddddMake it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
					color: '#232323'
				},
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[
								-3.6261564904290537,
								37.19739755955922
							],
							[
								-3.62913187779003,
								37.195696076012084
							],
							[
								-3.6275938555351672,
								37.19497044685451
							],
							[
								-3.625425630814476,
								37.196076110827306
							],
							[
								-3.6261564904290537,
								37.19739755955922
							]
						]
					]
				}
			},
		];
	}

	ngOnInit() {

		mapboxgl as typeof mapboxgl;
		this.map = new mapboxgl.Map({
			accessToken: environment.mapbox.publicToken,
			container: 'map',
			style: this.style,
			zoom: 13,
			center: [this.lng, this.lat],
		});



		this.map.addControl(
			new MapboxLanguage({
				defaultLanguage: 'es',
			})
		);

		this.map.on('load', () => {
			// Add the information to display on the pop-up
			this.map.addSource('places', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							properties: {
								description: '<strong>dddddMake it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
								color: '#232323'
							},
							geometry: {
								type: 'Polygon',
								coordinates: [
									[
										[
											-3.6261564904290537,
											37.19739755955922
										],
										[
											-3.62913187779003,
											37.195696076012084
										],
										[
											-3.6275938555351672,
											37.19497044685451
										],
										[
											-3.625425630814476,
											37.196076110827306
										],
										[
											-3.6261564904290537,
											37.19739755955922
										]
									]
								]
							}
						},
					]



				},
			});
			// Add a layer showing the places.
			this.map.addLayer({
				id: 'places',
				type: 'fill',
				source: 'places',
				paint: {
					'fill-color': ['get', 'color'],
					'fill-opacity': 0.7
				},
			});

			this.map.addLayer({
				id: 'outline',
				type: 'line',
				source: 'places',
				paint: {
					'line-color': '#000',
					'line-width': 1
				},
			});

			// Create a popup, but don't add it to the map yet.
			const popup = new mapboxgl.Popup({
				closeButton: true,
				closeOnClick: false,
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
	}
}
