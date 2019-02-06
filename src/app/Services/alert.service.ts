import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessagesComponent } from '../pages/shared/dialog/messages/messages.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { LogoutUser } from '../store/Actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSubcription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  initAlertListener() {
    this.alertSubcription = this.store.select('error')
      .pipe(filter((error: any) => error.reject.status === 0 || error.reject.status === 403))
      .subscribe(error => {
        this.dialog.open(MessagesComponent, { data: Constants[error.reject.status] })
          .afterClosed().subscribe(_ => this.store.dispatch(new LogoutUser()));
      });
  }

}
