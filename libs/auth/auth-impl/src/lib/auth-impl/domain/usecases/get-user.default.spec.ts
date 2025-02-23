import { TestBed } from '@angular/core/testing';
import { GetUserUseCaseDefault } from './get-user.default';
import { AuthRepository } from '../repository/auth.repository';
import { right, left, match } from 'fp-ts/lib/Either';
import { AuthUser } from '@ng-sota/auth-api';

describe('GetUserUseCaseDefault', () => {
  let useCase: GetUserUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  const mockUser: AuthUser = {
    id: '123',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.png',
  };

  beforeEach(() => {
    // GIVEN: Un repositorio de autenticación mockeado
    authRepositoryMock = {
      getUser: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetUserUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetUserUseCaseDefault);
  });

  describe('execute', () => {
    it('should return user successfully', async () => {
      // GIVEN: El repositorio devuelve un Right con el usuario
      authRepositoryMock.getUser.mockResolvedValue(right(mockUser));

      // WHEN: Se ejecuta el caso de uso
      const result = await useCase.execute();

      // THEN: El resultado debe ser un Right con el usuario
      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (user: AuthUser) => {
          expect(user).toEqual(mockUser);
          expect(user.id).toBe('123');
          expect(user.name).toBe('John Doe');
        }
      )(result);

      expect(authRepositoryMock.getUser).toHaveBeenCalled();
    });

    it('should handle error when repository fails', async () => {
      // GIVEN: El repositorio devuelve un Left con un error
      authRepositoryMock.getUser.mockResolvedValue(
        left(new Error('Error al obtener usuario'))
      );

      // WHEN: Se ejecuta el caso de uso
      const result = await useCase.execute();

      // THEN: El resultado debe ser un Left con el error esperado
      match(
        (error: Error) =>
          expect(error.message).toBe('Error al obtener usuario'),
        () => fail('Expected error but got success')
      )(result);

      expect(authRepositoryMock.getUser).toHaveBeenCalled();
    });
  });
});
