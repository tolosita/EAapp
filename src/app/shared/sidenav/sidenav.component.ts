import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { SetPage } from '../Actions/nav.actions';
import { Router } from '@angular/router';
declare var M: any;

const routes: any[] = [
  { path: '/', name: 'Inicio', icon: 'home', title: 'Inicio' },
  { path: '/usuarios', name: 'Usuarios', icon: 'people', title: 'Lista de Usuarios' }
];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: []
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidnavRef: ElementRef;
  rutas: any[] = routes;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.setRuta(routes.find(route => route.path === this.router.url).title);
    M.Sidenav.init(this.sidnavRef.nativeElement);
  }

  setRuta(title) {
    this.store.dispatch(new SetPage(title));
  }

  logout() {
    this.authService.logout();
  }

}
