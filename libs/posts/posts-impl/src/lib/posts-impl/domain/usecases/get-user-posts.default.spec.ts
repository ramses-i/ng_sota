import { TestBed } from '@angular/core/testing';
import { GetUserPostsUseCaseDefault } from './get-user-posts.default';
import { PostsRepository } from '../repository/posts.repository';
import { left, match, right } from 'fp-ts/lib/Either';
import { DPosts } from '@ng-sota/posts-api';
import { GetAuthUserIdUseCase } from '@ng-sota/auth-api';

describe('GetUserPostsUseCaseDefault', () => {
  let useCase: GetUserPostsUseCaseDefault;
  let postsRepositoryMock: jest.Mocked<PostsRepository>;
  let getUserIdMock: jest.Mocked<GetAuthUserIdUseCase>;

  const mockDPosts: DPosts = {
    items: [
      {
        id: '1',
        createdAt: '2024-02-23T10:00:00Z',
        content: 'Post de prueba',
        userId: '123',
        userAvatar: 'https://example.com/avatar.png',
        userName: 'Test User',
      },
    ],
  };

  beforeEach(() => {
    postsRepositoryMock = {
      getPostsFromUser: jest.fn(),
    } as unknown as jest.Mocked<PostsRepository>;

    getUserIdMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetAuthUserIdUseCase>;

    TestBed.configureTestingModule({
      providers: [
        GetUserPostsUseCaseDefault,
        { provide: PostsRepository, useValue: postsRepositoryMock },
        { provide: GetAuthUserIdUseCase, useValue: getUserIdMock },
      ],
    });

    useCase = TestBed.inject(GetUserPostsUseCaseDefault);
  });

  describe('execute', () => {
    it('should get posts for a specific user ID', async () => {
      postsRepositoryMock.getPostsFromUser.mockResolvedValue(right(mockDPosts));

      const result = await useCase.execute('123');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          const post = posts.items[0];
          expect(post.id).toBe('1');
          expect(post.content).toBe('Post de prueba');
          expect(post.userId).toBe('123');
          expect(post.userAvatar).toBe('https://example.com/avatar.png');
          expect(post.userName).toBe('Test User');
        }
      )(result);

      expect(postsRepositoryMock.getPostsFromUser).toHaveBeenCalledWith('123');
    });

    it('should get posts for the current user if userId is empty', async () => {
      getUserIdMock.execute.mockReturnValue('456');
      postsRepositoryMock.getPostsFromUser.mockResolvedValue(right(mockDPosts));

      const result = await useCase.execute('');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          expect(posts.items[0].userId).toBe('123');
        }
      )(result);

      expect(getUserIdMock.execute).toHaveBeenCalled();
      expect(postsRepositoryMock.getPostsFromUser).toHaveBeenCalledWith('456');
    });

    it('should return error if getPostsFromUser fails', async () => {
      postsRepositoryMock.getPostsFromUser.mockResolvedValue(
        left(new Error('Failed to get user posts'))
      );

      const result = await useCase.execute('123');

      match(
        (error: Error) =>
          expect(error.message).toBe('Failed to get user posts'),
        () => fail('Expected error but got success')
      )(result);
    });

    it('should return error if user ID cannot be retrieved', async () => {
      getUserIdMock.execute.mockReturnValue('');
      postsRepositoryMock.getPostsFromUser.mockResolvedValue(
        left(new Error('User ID not found'))
      );

      const result = await useCase.execute('');

      match(
        (error: Error) => expect(error.message).toBe('User ID not found'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
