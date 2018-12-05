import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { SetPage } from '../../../store/Actions/nav.actions';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

const routes: any[] = [
  { path: '/', name: 'Inicio', icon: 'home', title: 'Inicio' },
  { path: '/usuarios', name: 'Usuarios', icon: 'people', title: 'Lista de Usuarios' }
];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: []
})
export class SidenavComponent implements OnInit, OnDestroy {

  rutas: any[] = routes;
  subscription: Subscription;
  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(auth => this.user = new User()/* auth.user */);
    this.setRuta(routes.find(route => route.path === this.router.url).title);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setRuta(title) {
    this.store.dispatch(new SetPage(title));
  }

  logout() {
    this.authService.logout();
  }

}
