import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from '../dashboard/usuarios/usuarios.component';

export const dashboardRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'usuarios', component: UsuariosComponent }
];
