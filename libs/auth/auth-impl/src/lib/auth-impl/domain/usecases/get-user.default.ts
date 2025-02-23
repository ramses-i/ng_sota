import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { AuthUser, GetUserUseCase } from '@ng-sota/auth-api';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class GetUserUseCaseDefault extends GetUserUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(): Promise<Either<Error, AuthUser>> {
    return this.repository.getUser();
  }
}
