import { NgModule } from '@angular/core';
import { LoginDefault } from './usecases/impl/login.default';
import { LoginUseCase } from './usecases/login.usecase';

@NgModule({
  providers: [
    /* Dependency Injection */
    {
      provide: LoginUseCase,
      useClass: LoginDefault,
    },
  ],
})
export class LoginDomainModule {}
