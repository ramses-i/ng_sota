import { TestBed } from '@angular/core/testing';
import { AuthRepositoryDefault } from './auth-repository.default';
import { AuthRemoteDataSource } from './auth-remote.datasource';
import { of } from 'rxjs';
import { right, left, match } from 'fp-ts/lib/Either';

describe('AuthRepositoryDefault', () => {
  let repository: AuthRepositoryDefault;
  let remoteDataSourceMock: jest.Mocked<AuthRemoteDataSource>;

  beforeEach(() => {
    remoteDataSourceMock = {
      doLogin: jest.fn(),
      doLogout: jest.fn(),
      getAuthStatus: jest.fn(),
      getUser: jest.fn(),
      checkSession: jest.fn().mockReturnValue(of(true)),
    } as unknown as jest.Mocked<AuthRemoteDataSource>;

    TestBed.configureTestingModule({
      providers: [
        AuthRepositoryDefault,
        { provide: AuthRemoteDataSource, useValue: remoteDataSourceMock },
      ],
    });

    repository = TestBed.inject(AuthRepositoryDefault);
  });

  it('should do login successfully', async () => {
    remoteDataSourceMock.doLogin.mockResolvedValue(right(true));

    const result = await repository.doLogin('user', 'pass');
    expect(remoteDataSourceMock.doLogin).toHaveBeenCalledWith('user', 'pass');

    match(
      (error: Error) =>
        fail(`Expected success but got error: ${error.message}`),
      (value: boolean) => expect(value).toBe(true)
    )(result);
  });

  it('should handle login failure', async () => {
    remoteDataSourceMock.doLogin.mockResolvedValue(
      left(new Error('Invalid credentials'))
    );

    const result = await repository.doLogin('user', 'wrongpass');

    match(
      (error: Error) => expect(error.message).toBe('Invalid credentials'),
      () => fail('Expected error but got success')
    )(result);
  });

  it('should check session status', (done) => {
    remoteDataSourceMock.checkSession.mockReturnValue(of(true));

    repository.checkSession().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(true);
      done();
    });
  });
});
