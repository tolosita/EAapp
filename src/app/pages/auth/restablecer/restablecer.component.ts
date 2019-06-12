import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { ThrowError } from '../../../store/Actions/alert.actions';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../../../app.constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styles: ['']
})
export class RestablecerComponent {

  cargando: boolean;
  error: string;
  hide = true;
  hide2 = true;
  restablecerForm = this.fb.group({
    clave: [null, Validators.required],
    reclave: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  onSubmit() {
    if (this.restablecerForm.value.clave !== this.restablecerForm.value.reclave) {
      this.reclave.setErrors({ 'notEquals': true });
    } else {
      if (this.restablecerForm.invalid) { return; }
      this.cargando = true;
      this.error = null;
      this.authService.restablecerClave(+this.route.snapshot.paramMap.get('id'), this.restablecerForm.value.clave)
        .then(_ => {
          this.snackBar.open(Constants.RESTABLECER_SUCCES, Constants.BTN_OK, { duration: 3000 });
        })
        .catch(reject => {
          this.error = reject.error ? reject.error.message : null;
          this.store.dispatch(new ThrowError(reject));
        })
        .finally(() => {
          this.cargando = false;
        });
    }
  }

  getErrorMessage(input: FormControl) {
    return input.hasError('notEquals') ? 'Las contraseñas no coinciden' :
      input.hasError('required') ? 'Debes introducir un valor' :
        '';
  }

  get clave() { return this.restablecerForm.get('clave'); }

  get reclave() { return this.restablecerForm.get('reclave'); }

}
