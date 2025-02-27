import { TestBed } from '@angular/core/testing';
import { GetAuthStatusUseCaseDefault } from './get-auth-status.default';
import { AuthRepository } from '../repository/auth.repository';

describe('GetAuthStatusUseCaseDefault', () => {
  let useCase: GetAuthStatusUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      isAuthenticated: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAuthStatusUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetAuthStatusUseCaseDefault);
  });

  it('should return true if user is authenticated', () => {
    authRepositoryMock.isAuthenticated.mockReturnValue(true);

    const result = useCase.execute();

    expect(result).toBe(true);
    expect(authRepositoryMock.isAuthenticated).toHaveBeenCalled();
  });

  it('should return false if user is not authenticated', () => {
    authRepositoryMock.isAuthenticated.mockReturnValue(false);

    const result = useCase.execute();

    expect(result).toBe(false);
    expect(authRepositoryMock.isAuthenticated).toHaveBeenCalled();
  });
});
