import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { LogoutUser } from '../../store/Actions/auth.actions';

const routes: any[] = [
  { path: '/', name: 'Inicio', icon: 'home' },
  { path: '/usuarios', name: 'Usuarios', icon: 'people', }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  rutas: any[] = routes;
  user: User;
  subscriptionAuth: Subscription;
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
    this.subscriptionAuth = this.store.select('auth').subscribe(auth => this.user = new User()/* auth.user */);
  }

  ngOnDestroy(): void {
    this.subscriptionAuth.unsubscribe();
  }

  logout() {
    this.store.dispatch(new LogoutUser());
  }

}
