import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppState } from '../../../../store/app.store';
import { Store } from '@ngrx/store';
import { TipoDocumento } from 'src/app/models/tipoDocumento';
import { Client } from '../../../../models/client.model';
import { EditClient, SaveClient } from '../../../../store/Actions/client.actions';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  tipoDocumentos: TipoDocumento[];
  error: string;
  cliente: Client;
  id: number;
  clientForm = this.fb.group({
    tipoDocumento: [null, Validators.required],
    nroDocumento: [null, Validators.required],
    nombre: [null, Validators.required],
    apellidos: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    telefono: [null, [Validators.required, Validators.minLength(7)]],
    celular: [''],
    direccion: [null, Validators.required],
    pais: [null, Validators.required],
    ciudad: ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    public dialogRef: MatDialogRef<ClienteComponent>,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.sharedService.getTipoDocumentos().subscribe(tipoDocumentos => this.tipoDocumentos = tipoDocumentos);
    this.store.select('clients').subscribe(clients => {
      this.cliente = clients.client;
      this.error = clients.error;
      if (clients.error) { this.nroDocumento.setErrors({ 'exist': true }); }
    });

    if (this.data) {
      this.id = this.cliente.id;
      this.clientForm.controls['tipoDocumento'].setValue(this.cliente.tipoDocumento && this.cliente.tipoDocumento.id);
      this.clientForm.controls['nroDocumento'].setValue(this.cliente.nroDocumento);
      this.clientForm.controls['nombre'].setValue(this.cliente.nombre);
      this.clientForm.controls['apellidos'].setValue(this.cliente.apellidos);
      this.clientForm.controls['email'].setValue(this.cliente.email);
      this.clientForm.controls['telefono'].setValue(this.cliente.telefono);
      this.clientForm.controls['celular'].setValue(this.cliente.celular);
      this.clientForm.controls['direccion'].setValue(this.cliente.direccion);
      this.clientForm.controls['pais'].setValue(this.cliente.pais);
      this.clientForm.controls['ciudad'].setValue(this.cliente.ciudad);
    }
  }

  onSubmit() {
    if (this.clientForm.invalid) { return; }
    this.clientForm.value.tipoDocumento = this.tipoDocumentos.find(tipoDocumento =>
      tipoDocumento.id === this.clientForm.value.tipoDocumento);
    this.store.dispatch(this.data ? new EditClient({ ...this.clientForm.value, id: this.id }) : new SaveClient(this.clientForm.value));
  }

  getErrorMessage(input: FormControl) {
    return input.hasError('required') ? 'Debes introducir un valor' :
      input.hasError('email') ? 'No es un correo electrónico válido' :
        input.hasError('minlength') ? 'Ingrese minimo 7 digitos' :
          input.hasError('exist') ? this.error :
            '';
  }

  get tipoDocumento() { return this.clientForm.get('tipoDocumento'); }
  get nroDocumento() { return this.clientForm.get('nroDocumento'); }
  get nombre() { return this.clientForm.get('nombre'); }
  get apellidos() { return this.clientForm.get('apellidos'); }
  get email() { return this.clientForm.get('email'); }
  get telefono() { return this.clientForm.get('telefono'); }
  get celular() { return this.clientForm.get('celular'); }
  get direccion() { return this.clientForm.get('direccion'); }
  get pais() { return this.clientForm.get('pais'); }
  get ciudad() { return this.clientForm.get('ciudad'); }

}
