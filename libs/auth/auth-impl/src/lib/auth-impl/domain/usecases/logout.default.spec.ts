import { TestBed } from '@angular/core/testing';
import { LogoutUseCaseDefault } from './logout.default';
import { AuthRepository } from '../repository/auth.repository';
import { right, left, match } from 'fp-ts/lib/Either';

describe('LogoutUseCaseDefault', () => {
  let useCase: LogoutUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    // GIVEN: Un repositorio de autenticación mockeado
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
      // GIVEN: El repositorio devuelve Right(true) cuando el cierre de sesión es exitoso
      authRepositoryMock.doLogout.mockResolvedValue(right(true));

      // WHEN: Se ejecuta el caso de uso
      const result = await useCase.execute();

      // THEN: El resultado debe ser Right(true)
      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (success: boolean) => expect(success).toBe(true)
      )(result);

      expect(authRepositoryMock.doLogout).toHaveBeenCalled();
    });

    it('should return error when logout fails', async () => {
      // GIVEN: El repositorio devuelve Left(Error) cuando falla el cierre de sesión
      authRepositoryMock.doLogout.mockResolvedValue(
        left(new Error('Error al cerrar sesión'))
      );

      // WHEN: Se ejecuta el caso de uso
      const result = await useCase.execute();

      // THEN: El resultado debe ser Left con el mensaje de error
      match(
        (error: Error) => expect(error.message).toBe('Error al cerrar sesión'),
        () => fail('Expected error but got success')
      )(result);

      expect(authRepositoryMock.doLogout).toHaveBeenCalled();
    });

    it('should handle unexpected errors', async () => {
      // GIVEN: El repositorio lanza una excepción inesperada
      authRepositoryMock.doLogout.mockRejectedValue(
        new Error('Unexpected error')
      );

      // WHEN: Se ejecuta el caso de uso
      await expect(useCase.execute()).rejects.toThrow('Unexpected error');

      expect(authRepositoryMock.doLogout).toHaveBeenCalled();
    });
  });
});
