import { TestBed } from '@angular/core/testing';
import { AuthRemoteDataSourceDefault } from './auth-remote.default';
import { AuthService } from '@ng-sota/supabase';
import { of } from 'rxjs';
import { match } from 'fp-ts/lib/Either';

describe('AuthRemoteDataSourceDefault', () => {
  let dataSource: AuthRemoteDataSourceDefault;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: jest.fn().mockReturnValue(true),
      currentUserId: jest.fn().mockReturnValue('123'),
      checkSession: jest.fn().mockReturnValue(of(true)),
    } as unknown as jest.Mocked<AuthService>;

    TestBed.configureTestingModule({
      providers: [
        AuthRemoteDataSourceDefault,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    dataSource = TestBed.inject(AuthRemoteDataSourceDefault);
  });

  it('should do login successfully', async () => {
    authServiceMock.login.mockResolvedValueOnce();

    const result = await dataSource.doLogin('user', 'pass');

    match(
      (error: Error) =>
        fail(`Expected success but got error: ${error.message}`),
      (value: boolean) => expect(value).toBe(true)
    )(result);
  });

  it('should handle login error', async () => {
    authServiceMock.login.mockRejectedValueOnce(new Error('Login failed'));

    const result = await dataSource.doLogin('user', 'wrongpass');

    match(
      (error: Error) => expect(error.message).toBe('Supabase Auth Error 1'),
      () => fail('Expected error but got success')
    )(result);
  });

  it('should do logout successfully', async () => {
    authServiceMock.logout.mockResolvedValueOnce();

    const result = await dataSource.doLogout();

    match(
      (error: Error) =>
        fail(`Expected success but got error: ${error.message}`),
      (value: boolean) => expect(value).toBe(true)
    )(result);
  });

  it('should check session', (done) => {
    authServiceMock.checkSession.mockReturnValue(of(true));

    dataSource.checkSession().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(true);
      done();
    });
  });
});
