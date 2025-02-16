import { LoginUseCase } from '../login.usecase';
import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { LoginError } from '../../errors/login.error';
import { AuthRepository } from '../../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginDefault extends LoginUseCase {
  constructor(private authRepo: AuthRepository) {
    super();
  }

  override async execute(
    email: string,
    password: string
  ): Promise<Either<LoginError, boolean>> {
    return this.authRepo.login(email, password);
  }
}
