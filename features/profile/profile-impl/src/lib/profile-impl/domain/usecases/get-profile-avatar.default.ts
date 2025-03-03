import { GetProfileAvatarUseCase } from '@ng-sota/profile-api';
import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { GetAuthUserIdUseCase } from '@ng-sota/auth-api';
import { ProfileRepository } from '../repository/profile.repository';

@Injectable({
  providedIn: 'root',
})
export class GetProfileAvatarDefault extends GetProfileAvatarUseCase {
  constructor(
    private getUserId: GetAuthUserIdUseCase,
    private repository: ProfileRepository
  ) {
    super();
  }

  override execute(): Promise<Either<Error, string>> {
    const userId = this.getUserId.execute();
    return this.repository.getAvatar(userId);
  }
}
