import { TestBed } from '@angular/core/testing';
import { AuthRepositoryDefault } from './auth-repository.default';
import { AuthRemoteDataSource } from './auth-remote.datasource';
import { of } from 'rxjs';
import { left, match, right } from 'fp-ts/lib/Either';
import { AuthUser } from '@ng-sota/auth-api';

describe('AuthRepositoryDefault', () => {
  let repository: AuthRepositoryDefault;
  let remoteDataSourceMock: jest.Mocked<AuthRemoteDataSource>;

  const mockUser: AuthUser = {
    id: '123',
    name: 'testuser',
    avatar: 'avatar.png',
  };

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

  it('should get auth status successfully', async () => {
    remoteDataSourceMock.getAuthStatus.mockResolvedValue(right(true));

    const result = await repository.getAuthStatus();
    expect(remoteDataSourceMock.getAuthStatus).toHaveBeenCalled();

    match(
      (error: Error) =>
        fail(`Expected success but got error: ${error.message}`),
      (value: boolean) => expect(value).toBe(true)
    )(result);
  });

  it('should handle auth status failure', async () => {
    remoteDataSourceMock.getAuthStatus.mockResolvedValue(
      left(new Error('Failed to get auth status'))
    );

    const result = await repository.getAuthStatus();

    match(
      (error: Error) => expect(error.message).toBe('Failed to get auth status'),
      () => fail('Expected error but got success')
    )(result);
  });

  it('should get user successfully', async () => {
    remoteDataSourceMock.getUser.mockResolvedValue(right(mockUser));

    const result = await repository.getUser();
    expect(remoteDataSourceMock.getUser).toHaveBeenCalled();

    match(
      (error: Error) =>
        fail(`Expected success but got error: ${error.message}`),
      (user: AuthUser) => {
        expect(user.id).toBe('123');
        expect(user.name).toBe('testuser');
        expect(user.avatar).toBe('avatar.png');
      }
    )(result);
  });

  it('should handle user retrieval failure', async () => {
    remoteDataSourceMock.getUser.mockResolvedValue(
      left(new Error('Failed to get user'))
    );

    const result = await repository.getUser();

    match(
      (error: Error) => expect(error.message).toBe('Failed to get user'),
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

  it('should handle session check failure', (done) => {
    remoteDataSourceMock.checkSession.mockReturnValue(of(false));

    repository.checkSession().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(false);
      done();
    });
  });
});
