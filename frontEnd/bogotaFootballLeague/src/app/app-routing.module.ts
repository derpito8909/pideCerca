import { NgModule } from '@angular/core';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./principal/login/login.component";
import { RegistroComponent } from "./principal/registro/registro.component";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegistroComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
