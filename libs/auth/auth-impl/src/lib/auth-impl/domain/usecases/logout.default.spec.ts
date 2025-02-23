import { TestBed } from '@angular/core/testing';
import { LogoutUseCaseDefault } from './logout.default';
import { AuthRepository } from '../repository/auth.repository';
import { right, left, match } from 'fp-ts/lib/Either';

describe('LogoutUseCaseDefault', () => {
  let useCase: LogoutUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      doLogout: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        LogoutUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(LogoutUseCaseDefault);
  });

  describe('execute', () => {
    it('should logout successfully', async () => {
      authRepositoryMock.doLogout.mockResolvedValue(right(true));

      const result = await useCase.execute();

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (success: boolean) => expect(success).toBe(true)
      )(result);

      expect(authRepositoryMock.doLogout).toHaveBeenCalled();
    });

    it('should return error when logout fails', async () => {
      authRepositoryMock.doLogout.mockResolvedValue(
        left(new Error('Error al cerrar sesión'))
      );

      const result = await useCase.execute();

      match(
        (error: Error) => expect(error.message).toBe('Error al cerrar sesión'),
        () => fail('Expected error but got success')
      )(result);

      expect(authRepositoryMock.doLogout).toHaveBeenCalled();
    });

    it('should handle unexpected errors', async () => {
      authRepositoryMock.doLogout.mockRejectedValue(
        new Error('Unexpected error')
      );

      await expect(useCase.execute()).rejects.toThrow('Unexpected error');

      expect(authRepositoryMock.doLogout).toHaveBeenCalled();
    });
  });
});
