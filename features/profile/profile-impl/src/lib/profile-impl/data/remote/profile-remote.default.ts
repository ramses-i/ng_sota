import { ProfileRemoteDatasource } from '../profile-remote.datasource';
import { Injectable } from '@angular/core';
import { Either, left, right } from 'fp-ts/Either';
import { ProfileService } from '@ng-sota/supabase';
import { ProfileError } from '@ng-sota/profile-api';

@Injectable({
  providedIn: 'root',
})
export class ProfileRemoteDatasourceDefault extends ProfileRemoteDatasource {
  constructor(private profileService: ProfileService) {
    super();
  }

  override async getAvatar(userId: string): Promise<Either<Error, string>> {
    try {
      const result = await this.profileService.getAvatar(userId);

      if (result.error) {
        return left(new ProfileError(result.error.message));
      }

      return right(result.data[0].avatar as unknown as string);
    } catch (error) {
      console.error('getAvatar:', error);
      return left(new ProfileError('getPosts Call Error 1'));
    }
  }
}
