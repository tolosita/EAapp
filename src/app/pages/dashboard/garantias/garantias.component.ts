import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromActionsGarantia from '../../../store/Actions/garantia.actions';
import { AppState } from '../../../store/app.store';
import { Garantia } from '../../../models/garantia.model';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styles: []
})
export class GarantiasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fechaRegistro', 'boutique', 'email', 'telefono', 'usuario', 'estado', 'action'];
  dataSource: MatTableDataSource<Garantia>;
  cargando: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromActionsGarantia.LoadGarantias());
    this.store.select('garantias').subscribe(garantias => {
      this.cargando = garantias.isLoading;
      this.dataSource = new MatTableDataSource(garantias.garantias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
