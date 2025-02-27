import { Injectable } from '@angular/core';
import { CheckSessionUseCase } from '@ng-sota/auth-api';
import { AuthRepository } from '../repository/auth.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckSessionUseCaseDefault extends CheckSessionUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(): Observable<boolean> {
    return this.repository.checkSession();
  }
}
