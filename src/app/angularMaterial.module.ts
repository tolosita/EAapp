import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatGridListModule, MatListModule, MatCardModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

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
        LayoutModule
    ]
})
export class AngularMaterialModule { }
