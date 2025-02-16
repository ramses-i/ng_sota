import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginMainComponent } from './pages/main/login-main.component';
import { LoginPresentationComponent } from './login-presentation.component';
import { LoginMainFacade } from './pages/main/login-main.facade';

const routes: Routes = [
  {
    path: '',
    component: LoginPresentationComponent,
    children: [{ path: '', component: LoginMainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginMainFacade],
})
export class LoginPresentationModule {}
