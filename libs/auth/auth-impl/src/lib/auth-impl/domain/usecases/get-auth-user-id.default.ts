import { Injectable } from '@angular/core';
import { GetAuthUserIdUseCase } from '@ng-sota/auth-api';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAuthUserIdUseCaseDefault extends GetAuthUserIdUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(): string {
    return this.repository.getUserId();
  }
}
