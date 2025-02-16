import { NgModule } from '@angular/core';
import { AuthRepository } from '@ng-sota/login-domain';
import { AuthRepositoryDefault } from './auth-repository.default';
import { AuthRemoteDataSource } from './auth-remote.datasource';
import { AuthRemoteDataSourceDefault } from './remote/auth-remote.default';

@NgModule({
  providers: [
    /* Dependency Injection */
    {
      provide: AuthRepository,
      useClass: AuthRepositoryDefault,
    },
    {
      provide: AuthRemoteDataSource,
      useClass: AuthRemoteDataSourceDefault,
    },
  ],
})
export class LoginDataModule {}
