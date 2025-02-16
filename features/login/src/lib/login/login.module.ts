import { NgModule } from '@angular/core';
import { LoginDataModule } from '@ng-sota/login-data';
import { LoginDomainModule } from '@ng-sota/login-domain';
import { LoginPresentationModule } from '@ng-sota/login-presentation';

@NgModule({
  declarations: [],
  imports: [LoginDataModule, LoginDomainModule, LoginPresentationModule],
})
export class LoginModule {}
