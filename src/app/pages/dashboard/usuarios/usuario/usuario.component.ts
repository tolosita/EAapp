import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { SharedService } from '../../../../services/shared.service';
import { AppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { SaveUser, EditUser } from '../../../../store/Actions/user.actions';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  cargos: Role[];
  minDate = new Date();
  hide = true;
  error: string;
  user: User;
  id: number;
  userForm = this.fb.group({
    nombre: [null, Validators.required],
    apellidos: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [''],
    email: [null, [Validators.required, Validators.email]],
    clave: [null, [Validators.required, Validators.minLength(6)]],
    role: [null, Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    public dialogRef: MatDialogRef<UsuarioComponent>,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
  }

  ngOnInit() {
    this.sharedService.getRoles().subscribe(roles => this.cargos = roles);
    this.store.select('users').subscribe(users => {
      this.user = users.user;
      this.error = users.error;
      if (users.error) { this.email.setErrors({ 'exist': true }); }
    });

    if (this.data) {
      this.id = this.user.id;
      this.userForm.controls['nombre'].setValue(this.user.nombre);
      this.userForm.controls['apellidos'].setValue(this.user.apellidos);
      this.userForm.controls['fechaNacimiento'].setValue(this.user.fechaNacimiento && this.user.fechaNacimiento.substring(0, 10));
      this.userForm.controls['direccion'].setValue(this.user.direccion);
      this.userForm.controls['email'].setValue(this.user.email);
      this.userForm.controls['clave'].setValue(this.user.clave);
      this.userForm.controls['role'].setValue(this.user.role && this.user.role.id);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) { return; }
    this.userForm.value.role = this.cargos.find(rol => rol.id === this.userForm.value.role);
    this.store.dispatch(this.data ? new EditUser({ ...this.userForm.value, id: this.id }) : new SaveUser(this.userForm.value));
  }

  getErrorMessage(input: FormControl) {
    return input.hasError('required') ? 'Debes introducir un valor' :
      input.hasError('email') ? 'No es un correo electrónico válido' :
        input.hasError('minlength') ? 'Ingrese minimo 6 digitos' :
          input.hasError('exist') ? this.error :
            '';
  }

  get nombre() { return this.userForm.get('nombre'); }
  get apellidos() { return this.userForm.get('apellidos'); }
  get fechaNacimiento() { return this.userForm.get('fechaNacimiento'); }
  get direccion() { return this.userForm.get('direccion'); }
  get email() { return this.userForm.get('email'); }
  get clave() { return this.userForm.get('clave'); }
  get role() { return this.userForm.get('role'); }

}
