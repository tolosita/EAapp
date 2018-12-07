import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatGridListModule, MatListModule, MatCardModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule,
    MatDialogModule, MatProgressBarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MessagesComponent } from './components/shared/dialog/messages/messages.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatGridListModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatProgressBarModule,
        LayoutModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatGridListModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatProgressBarModule,
        LayoutModule
    ],
    entryComponents: [
        MessagesComponent
    ]
})
export class AngularMaterialModule { }
