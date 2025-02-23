import { TestBed } from '@angular/core/testing';
import { GetAuthUserIdUseCaseDefault } from './get-auth-user-id.default';
import { AuthRepository } from '../repository/auth.repository';

describe('GetAuthUserIdUseCaseDefault', () => {
  let useCase: GetAuthUserIdUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      getUserId: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAuthUserIdUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetAuthUserIdUseCaseDefault);
  });

  it('should return the user ID when authenticated', () => {
    authRepositoryMock.getUserId.mockReturnValue('12345');

    const result = useCase.execute();

    expect(result).toBe('12345');
    expect(authRepositoryMock.getUserId).toHaveBeenCalled();
  });

  it('should return an empty string if user ID is not available', () => {
    authRepositoryMock.getUserId.mockReturnValue('');

    const result = useCase.execute();

    expect(result).toBe('');
    expect(authRepositoryMock.getUserId).toHaveBeenCalled();
  });
});
