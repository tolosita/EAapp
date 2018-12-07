import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { LoginUser, LogoutUser, LoggedUser, LoginUserError } from '../store/Actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.reducer';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private appService: AppService
  ) { }

  initAuthListener() {
    this.subscription = this.store.select('auth')
      .subscribe(auth => {
        this.logged = auth.user;
      });
  }

  login(user: User) {
    this.store.dispatch(new LoginUser());
    this.appService.postRequest(Constants.PATH_LOGIN, user)
      .then(response => {
        if (response) {
          this.store.dispatch(new LoggedUser(<User>response));
          this.router.navigate(['/']);
        } else {
          this.store.dispatch(new LoginUserError({
            status: '404',
            message: 'Usuario no encontrado'
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.store.dispatch(new LogoutUser());
  }

  isAuth() {
    // if (this.logged == null) {
    //   this.router.navigate(['/login']);
    // }
    return true; // this.logged != null;
  }
}
