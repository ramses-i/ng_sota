import { Provider } from '@angular/core';
import { GetProfileAvatarUseCase } from '@ng-sota/profile-api';
import { ProfileRepository } from '../domain/repository/profile.repository';
import { ProfileRepositoryDefault } from '../data/profile.default';
import { ProfileRemoteDatasource } from '../data/profile-remote.datasource';
import { ProfileRemoteDatasourceDefault } from '../data/remote/profile-remote.default';
import { GetProfileAvatarDefault } from '../domain/usecases/get-profile-avatar.default';

export const profileDependencies: Provider[] = [
  {
    provide: ProfileRepository,
    useClass: ProfileRepositoryDefault,
  },
  {
    provide: ProfileRemoteDatasource,
    useClass: ProfileRemoteDatasourceDefault,
  },
  {
    provide: GetProfileAvatarUseCase,
    useClass: GetProfileAvatarDefault,
  },
];
