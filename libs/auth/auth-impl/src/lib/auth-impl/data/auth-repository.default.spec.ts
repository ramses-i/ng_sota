import { TestBed } from '@angular/core/testing';
import { AuthRepositoryDefault } from './auth-repository.default';
import { AuthRemoteDataSource } from './auth-remote.datasource';
import { of } from 'rxjs';
import { left, match, right } from 'fp-ts/lib/Either';

describe('AuthRepositoryDefault', () => {
  let repository: AuthRepositoryDefault;
  let remoteDataSourceMock: jest.Mocked<AuthRemoteDataSource>;

  beforeEach(() => {
    remoteDataSourceMock = {
      doLogin: jest.fn(),
      doLogout: jest.fn(),
      isAuthenticated: jest.fn(),
      getUserId: jest.fn(),
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

  it('should do logout successfully', async () => {
    remoteDataSourceMock.doLogout.mockResolvedValue(right(true));

    const result = await repository.doLogout();
    expect(remoteDataSourceMock.doLogout).toHaveBeenCalled();

    match(
      (error: Error) =>
        fail(`Expected success but got error: ${error.message}`),
      (value: boolean) => expect(value).toBe(true)
    )(result);
  });

  it('should handle logout failure', async () => {
    remoteDataSourceMock.doLogout.mockResolvedValue(
      left(new Error('Logout failed'))
    );

    const result = await repository.doLogout();

    match(
      (error: Error) => expect(error.message).toBe('Logout failed'),
      () => fail('Expected error but got success')
    )(result);
  });

  it('should return true if user is authenticated', () => {
    remoteDataSourceMock.isAuthenticated.mockReturnValue(true);

    const result = repository.isAuthenticated();
    expect(result).toBe(true);
    expect(remoteDataSourceMock.isAuthenticated).toHaveBeenCalled();
  });

  it('should return false if user is not authenticated', () => {
    remoteDataSourceMock.isAuthenticated.mockReturnValue(false);

    const result = repository.isAuthenticated();
    expect(result).toBe(false);
    expect(remoteDataSourceMock.isAuthenticated).toHaveBeenCalled();
  });

  it('should return user ID', () => {
    remoteDataSourceMock.getUserId.mockReturnValue('123');

    const userId = repository.getUserId();
    expect(userId).toBe('123');
    expect(remoteDataSourceMock.getUserId).toHaveBeenCalled();
  });

  it('should check session status', (done) => {
    remoteDataSourceMock.checkSession.mockReturnValue(of(true));

    repository.checkSession().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(true);
      done();
    });
  });

  it('should handle session check failure', (done) => {
    remoteDataSourceMock.checkSession.mockReturnValue(of(false));

    repository.checkSession().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(false);
      done();
    });
  });
});
