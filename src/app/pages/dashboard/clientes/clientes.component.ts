import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Client } from '../../../models/client.model';
import * as fromActionsClient from '../../../store/Actions/client.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { ConfirmComponent } from '../../shared/dialog/confirm/confirm.component';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'tipoDocumento',
    'nroDocumento', 'direccion', 'telefono', 'fechaIngreso', 'action'];
  dataSource: MatTableDataSource<Client>;
  cargando: boolean;
  expandedElement: Client | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromActionsClient.LoadClients());
    this.store.select('clients').subscribe(clients => {
      this.cargando = clients.isLoading;
      this.dataSource = new MatTableDataSource(clients.clients);
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

  crearCliente() {
    this.store.dispatch(new fromActionsClient.CreateClient());
  }

  mostrarCliente(id: number) {
    this.store.dispatch(new fromActionsClient.ShowClient(id));
  }

  deleteCliente(id: number) {
    this.dialog.open(ConfirmComponent, {
      data: () => {
        this.store.dispatch(new fromActionsClient.DeleteClient(id));
      }
    });
  }

}
