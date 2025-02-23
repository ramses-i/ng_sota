import { TestBed } from '@angular/core/testing';
import { GetStatusUseCaseDefault } from './get-status.default';
import { AuthRepository } from '../repository/auth.repository';
import { left, match, right } from 'fp-ts/lib/Either';

describe('GetStatusUseCaseDefault', () => {
  let useCase: GetStatusUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      getAuthStatus: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetStatusUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetStatusUseCaseDefault);
  });

  describe('execute', () => {
    it('should return true when user is authenticated', async () => {
      authRepositoryMock.getAuthStatus.mockResolvedValue(right(true));

      const result = await useCase.execute();

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (status: boolean) => {
          expect(status).toBe(true);
        }
      )(result);

      expect(authRepositoryMock.getAuthStatus).toHaveBeenCalled();
    });

    it('should return false when user is not authenticated', async () => {
      authRepositoryMock.getAuthStatus.mockResolvedValue(right(false));

      const result = await useCase.execute();

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (status: boolean) => {
          expect(status).toBe(false);
        }
      )(result);

      expect(authRepositoryMock.getAuthStatus).toHaveBeenCalled();
    });

    it('should return an error when the repository fails', async () => {
      authRepositoryMock.getAuthStatus.mockResolvedValue(
        left(new Error('Error al verificar el estado de autenticación'))
      );

      const result = await useCase.execute();

      match(
        (error: Error) => {
          expect(error.message).toBe(
            'Error al verificar el estado de autenticación'
          );
        },
        () => fail('Expected error but got success')
      )(result);

      expect(authRepositoryMock.getAuthStatus).toHaveBeenCalled();
    });
  });
});
