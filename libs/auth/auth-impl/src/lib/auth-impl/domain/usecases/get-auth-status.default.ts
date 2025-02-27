import { Injectable } from '@angular/core';
import { GetAuthStatusUseCase } from '@ng-sota/auth-api';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAuthStatusUseCaseDefault extends GetAuthStatusUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(): boolean {
    return this.repository.isAuthenticated();
  }
}
