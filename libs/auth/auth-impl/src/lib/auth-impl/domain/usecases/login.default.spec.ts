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
      authRepositoryMock.doLogin.mockResolvedValue(right(true));

      const result = await useCase.execute(username, password);

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
      authRepositoryMock.doLogin.mockResolvedValue(
        left(new Error('Invalid credentials'))
      );

      const result = await useCase.execute(username, 'wrongpassword');

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
      authRepositoryMock.doLogin.mockRejectedValue(
        new Error('Unexpected error')
      );

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
