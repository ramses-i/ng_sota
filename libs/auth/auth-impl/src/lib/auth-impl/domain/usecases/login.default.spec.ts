import { TestBed } from '@angular/core/testing';
import { LoginUseCaseDefault } from './login.default';
import { AuthRepository } from '../repository/auth.repository';
import { right, left, match } from 'fp-ts/lib/Either';

describe('LoginUseCaseDefault', () => {
  let useCase: LoginUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  const username = 'testuser';
  const password = 'testpassword';

  beforeEach(() => {
    // GIVEN: Un repositorio de autenticación mockeado
    authRepositoryMock = {
      doLogin: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        LoginUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(LoginUseCaseDefault);
  });

  describe('execute', () => {
    it('should login successfully with valid credentials', async () => {
      // GIVEN: El repositorio devuelve Right(true) cuando las credenciales son correctas
      authRepositoryMock.doLogin.mockResolvedValue(right(true));

      // WHEN: Se ejecuta el caso de uso con credenciales válidas
      const result = await useCase.execute(username, password);

      // THEN: El resultado debe ser Right(true)
      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (success: boolean) => expect(success).toBe(true)
      )(result);

      expect(authRepositoryMock.doLogin).toHaveBeenCalledWith(
        username,
        password
      );
    });

    it('should fail when credentials are invalid', async () => {
      // GIVEN: El repositorio devuelve Left(Error) cuando las credenciales son incorrectas
      authRepositoryMock.doLogin.mockResolvedValue(
        left(new Error('Invalid credentials'))
      );

      // WHEN: Se ejecuta el caso de uso con credenciales incorrectas
      const result = await useCase.execute(username, 'wrongpassword');

      // THEN: El resultado debe ser Left con el mensaje de error
      match(
        (error: Error) => expect(error.message).toBe('Invalid credentials'),
        () => fail('Expected error but got success')
      )(result);

      expect(authRepositoryMock.doLogin).toHaveBeenCalledWith(
        username,
        'wrongpassword'
      );
    });

    it('should handle unexpected errors', async () => {
      // GIVEN: El repositorio lanza una excepción
      authRepositoryMock.doLogin.mockRejectedValue(
        new Error('Unexpected error')
      );

      // WHEN: Se ejecuta el caso de uso
      await expect(useCase.execute(username, password)).rejects.toThrow(
        'Unexpected error'
      );

      expect(authRepositoryMock.doLogin).toHaveBeenCalledWith(
        username,
        password
      );
    });
  });
});
