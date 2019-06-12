import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecuperarComponent } from './pages/auth/recuperar/recuperar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { UsuariosComponent } from './pages/dashboard/usuarios/usuarios.component';
import { GarantiasComponent } from './pages/dashboard/garantias/garantias.component';
import { ClientesComponent } from './pages/dashboard/clientes/clientes.component';
import { GarantiaComponent } from './pages/dashboard/garantias/garantia/garantia.component';
import { RestablecerComponent } from './pages/auth/restablecer/restablecer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'restablecer/:id', component: RestablecerComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'garantias', component: GarantiasComponent },
      { path: 'garantia/:id', component: GarantiaComponent },
      { path: '**', redirectTo: '/dashboard' }
    ],
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
