import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean;
  error: any;
  subscription: Subscription;
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    clave: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(auth => {
      this.cargando = auth.isLoading;
      this.error = auth.error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.invalid) { return; }
    this.authService.login(this.loginForm.value);
  }

  getErrorMessage(input) {
    return input.hasError('required') ? 'Debes introducir un valor' :
      input.hasError('email') ? 'No es un correo electrónico válido' :
        '';
  }

  get email() { return this.loginForm.get('email'); }
  get clave() { return this.loginForm.get('clave'); }
}
