import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
// Modulos
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angularMaterial.module';

// Environment
import { environment } from '../environments/environment';

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducers, appEffects } from './store/app.store';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecuperarComponent } from './pages/auth/recuperar/recuperar.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { NavComponent } from './pages/shared/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { UsuariosComponent } from './pages/dashboard/usuarios/usuarios.component';
import { MessagesComponent } from './pages/shared/dialog/messages/messages.component';
import { UsuarioComponent } from './pages/dashboard/usuarios/usuario/usuario.component';
import { ConfirmComponent } from './pages/shared/dialog/confirm/confirm.component';
import { LoaderComponent } from './pages/shared/loader/loader.component';
import { GarantiasComponent } from './pages/dashboard/garantias/garantias.component';
import { ClientesComponent } from './pages/dashboard/clientes/clientes.component';
import { ClienteComponent } from './pages/dashboard/clientes/cliente/cliente.component';
import { GarantiaComponent } from './pages/dashboard/garantias/garantia/garantia.component';

import { TokenInterceptor } from './app.interceptor';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RestablecerComponent } from './pages/auth/restablecer/restablecer.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent,
    UsuariosComponent,
    MessagesComponent,
    LoaderComponent,
    UsuarioComponent,
    ConfirmComponent,
    NavComponent,
    GarantiasComponent,
    ClientesComponent,
    ClienteComponent,
    GarantiaComponent,
    RestablecerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot(appEffects)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
