import { ProfileRepository } from '../domain/repository/profile.repository';
import { Either } from 'fp-ts/Either';
import { Injectable } from '@angular/core';
import { ProfileRemoteDatasource } from './profile-remote.datasource';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepositoryDefault extends ProfileRepository {
  constructor(private remote: ProfileRemoteDatasource) {
    super();
  }

  override getAvatar(userId: string): Promise<Either<Error, string>> {
    return this.remote.getAvatar(userId);
  }
}
