import { TestBed } from '@angular/core/testing';
import { CheckSessionUseCaseDefault } from './check-session.default';
import { AuthRepository } from '../repository/auth.repository';
import { of } from 'rxjs';

describe('CheckSessionUseCaseDefault', () => {
  let useCase: CheckSessionUseCaseDefault;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      checkSession: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    TestBed.configureTestingModule({
      providers: [
        CheckSessionUseCaseDefault,
        { provide: AuthRepository, useValue: authRepositoryMock },
      ],
    });

    useCase = TestBed.inject(CheckSessionUseCaseDefault);
  });

  describe('execute', () => {
    it('should return true when session is active', (done) => {
      authRepositoryMock.checkSession.mockReturnValue(of(true));

      useCase.execute().subscribe((result) => {
        expect(result).toBe(true);
        expect(authRepositoryMock.checkSession).toHaveBeenCalled();
        done();
      });
    });

    it('should return false when session is inactive', (done) => {
      authRepositoryMock.checkSession.mockReturnValue(of(false));

      useCase.execute().subscribe((result) => {
        expect(result).toBe(false);
        expect(authRepositoryMock.checkSession).toHaveBeenCalled();
        done();
      });
    });
  });
});
