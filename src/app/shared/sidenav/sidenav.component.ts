import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { SetPage } from '../Actions/nav.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';
import { Subscription } from 'rxjs';
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
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidnavRef: ElementRef;
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
    M.Sidenav.init(this.sidnavRef.nativeElement);
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
