import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Building, Feature } from 'server/export';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	@ViewChild('drawer') sidenav!: MatSidenav;
	@ViewChild('drawerButton') button!: MatButton;
	buildings: Building[] = [];
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

	ngOnInit(): void {
		this.http.get<Building[]>(`${environment.backendURL}/buildings`).subscribe(response => {
			for (let i = 0; i < response.length; i++) {
				this.buildings.push({
					id: response[i].id,
					name: response[i].name,
					campus: response[i].campus
				});
			}
		})
	}

	redirectTo(id: number) {
		this.isHandset$.subscribe(res => {
			if (res) {
				this.sidenav.toggle();
				// Button no longer stays focused after closing sidenav
				this.button['_elementRef'].nativeElement.classList.remove('cdk-program-focused');
			}
		})
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
			this.router.navigate(['/chart', id]));
	}
}
