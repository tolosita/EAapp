import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Referencia, IReferencia } from '../../../../models/referencia.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-garantia',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.scss']
})
export class GarantiaComponent implements OnInit {
  cargando: boolean;
  garantiaForm = this.fb.group({
    fechaRegistro: [null, Validators.required],
    boutique: [null, Validators.required],
    email: [null, Validators.email],
    telefono: [null, Validators.minLength(7)]
  });
  data: IReferencia[] = [new Referencia(), new Referencia(), new Referencia(), new Referencia(), new Referencia(), new Referencia()];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns: string[] = ['referencia', 'color', 'talla', 'total', 'cliente', 'factura', 'observaciones', 'fechaRecibido'];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ 'referencias': this.rows });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.data.forEach((d: IReferencia) => this.addRow(d, false));
    this.updateView();
  }

  addRow(d?: IReferencia, noUpdate?: boolean) {
    const row = this.fb.group({
      'referencia': [d && d.referencia ? d.referencia : null, []],
      'color': [d && d.color ? d.color : null, []],
      'talla': [d && d.talla ? d.talla : null, []],
      'total': [d && d.total ? d.total : null, []],
      'cliente': [d && d.cliente ? d.cliente : null, []],
      'factura': [d && d.factura ? d.factura : null, []],
      'observaciones': [d && d.observaciones ? d.observaciones : null, []],
      'fechaRecibido': [d && d.fechaRecibido ? d.fechaRecibido : null, []]
    });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  get referencias() {
    return this.form.get('referencias') as FormArray;
  }

}
