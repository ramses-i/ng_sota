import { Provider } from '@angular/core';
import {
  AuthRemoteDataSource,
  AuthRemoteDataSourceDefault,
  AuthRepository,
  AuthRepositoryDefault,
  CheckSessionUseCaseDefault,
  GetAuthStatusUseCaseDefault,
  GetAuthUserIdUseCaseDefault,
  LoginUseCaseDefault,
  LogoutUseCaseDefault,
} from '@ng-sota/auth-impl';
import {
  CheckSessionUseCase,
  GetAuthStatusUseCase,
  GetAuthUserIdUseCase,
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
    provide: GetAuthStatusUseCase,
    useClass: GetAuthStatusUseCaseDefault,
  },
  {
    provide: GetAuthUserIdUseCase,
    useClass: GetAuthUserIdUseCaseDefault,
  },
  {
    provide: LoginUseCase,
    useClass: LoginUseCaseDefault,
  },
  {
    provide: LogoutUseCase,
    useClass: LogoutUseCaseDefault,
  },
  {
    provide: CheckSessionUseCase,
    useClass: CheckSessionUseCaseDefault,
  },
];
