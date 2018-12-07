import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessagesComponent } from '../components/shared/dialog/messages/messages.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
      .pipe(filter(error => error != null))
      .subscribe(error => {
        this.dialog.open(MessagesComponent, { data: error });
      });
  }

}
