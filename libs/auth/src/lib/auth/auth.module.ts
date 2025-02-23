import { Provider } from '@angular/core';
import {
  AuthRemoteDataSource,
  AuthRemoteDataSourceDefault,
  AuthRepository,
  AuthRepositoryDefault,
  GetStatusUseCaseDefault,
  GetUserUseCaseDefault,
  LoginUseCaseDefault,
  LogoutUseCaseDefault,
} from '@ng-sota/auth-impl';
import {
  GetStatusUseCase,
  GetUserUseCase,
  LoginUseCase,
  LogoutUseCase,
} from '@ng-sota/auth-api';

export const authDependencies: Provider[] = [
  {
    provide: AuthRepository,
    useClass: AuthRepositoryDefault,
  },
  {
    provide: AuthRemoteDataSource,
    useClass: AuthRemoteDataSourceDefault,
  },
  {
    provide: GetStatusUseCase,
    useClass: GetStatusUseCaseDefault,
  },
  {
    provide: GetUserUseCase,
    useClass: GetUserUseCaseDefault,
  },
  {
    provide: LoginUseCase,
    useClass: LoginUseCaseDefault,
  },
  {
    provide: LogoutUseCase,
    useClass: LogoutUseCaseDefault,
  },
];
