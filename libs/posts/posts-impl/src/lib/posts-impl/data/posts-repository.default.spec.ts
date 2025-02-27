import { TestBed } from '@angular/core/testing';
import { PostsRepositoryDefault } from './posts-repository.default';
import { PostsRemoteDataSource } from './posts-remote.datasource';
import { left, match, right } from 'fp-ts/lib/Either';
import { DPosts, PostsError } from '@ng-sota/posts-api';

describe('PostsRepositoryDefault', () => {
  let repository: PostsRepositoryDefault;
  let remoteDataSourceMock: jest.Mocked<PostsRemoteDataSource>;

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
    remoteDataSourceMock = {
      getPosts: jest.fn(),
      getPostsFromUser: jest.fn(),
      createPost: jest.fn(),
    } as unknown as jest.Mocked<PostsRemoteDataSource>;

    TestBed.configureTestingModule({
      providers: [
        PostsRepositoryDefault,
        { provide: PostsRemoteDataSource, useValue: remoteDataSourceMock },
      ],
    });

    repository = TestBed.inject(PostsRepositoryDefault);
  });

  describe('getPosts', () => {
    it('should get posts successfully', async () => {
      remoteDataSourceMock.getPosts.mockResolvedValue(right(mockDPosts));

      const result = await repository.getPosts();

      match(
        (error: PostsError) =>
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

      expect(remoteDataSourceMock.getPosts).toHaveBeenCalled();
    });

    it('should return error if getPosts fails', async () => {
      remoteDataSourceMock.getPosts.mockResolvedValue(
        left(new Error('Failed to get posts'))
      );

      const result = await repository.getPosts();

      match(
        (error: Error) => expect(error.message).toBe('Failed to get posts'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('getPostsFromUser', () => {
    it('should get posts from a specific user successfully', async () => {
      remoteDataSourceMock.getPostsFromUser.mockResolvedValue(
        right(mockDPosts)
      );

      const result = await repository.getPostsFromUser('123');

      match(
        (error: PostsError) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          const post = posts.items[0];
          expect(post.userId).toBe('123');
        }
      )(result);

      expect(remoteDataSourceMock.getPostsFromUser).toHaveBeenCalledWith('123');
    });

    it('should return error if getPostsFromUser fails', async () => {
      remoteDataSourceMock.getPostsFromUser.mockResolvedValue(
        left(new Error('Failed to get user posts'))
      );

      const result = await repository.getPostsFromUser('123');

      match(
        (error: Error) =>
          expect(error.message).toBe('Failed to get user posts'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('createPost', () => {
    it('should create a post successfully', async () => {
      remoteDataSourceMock.createPost.mockResolvedValue(right(true));

      const result = await repository.createPost('123', 'Nuevo post');

      match(
        (error: PostsError) =>
          fail(`Expected success but got error: ${error.message}`),
        (isCreated: boolean) => expect(isCreated).toBe(true)
      )(result);

      expect(remoteDataSourceMock.createPost).toHaveBeenCalledWith(
        '123',
        'Nuevo post'
      );
    });

    it('should return error if createPost fails', async () => {
      remoteDataSourceMock.createPost.mockResolvedValue(
        left(new Error('Failed to create post'))
      );

      const result = await repository.createPost('123', 'Nuevo post');

      match(
        (error: Error) => expect(error.message).toBe('Failed to create post'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
