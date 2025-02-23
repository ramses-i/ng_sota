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
        userId: '123',
        content: 'Este es un post de prueba',
        createdAt: '2024-02-23T10:00:00Z',
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
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (dPosts: DPosts) => {
          expect(dPosts.items.length).toBe(1);
          expect(dPosts.items[0].id).toBe('1');
          expect(dPosts.items[0].content).toBe('Este es un post de prueba');
        }
      )(result);
    });

    it('should handle error when getPosts fails', async () => {
      remoteDataSourceMock.getPosts.mockResolvedValue(
        left(new PostsError('Error al obtener posts'))
      );

      const result = await repository.getPosts();

      match(
        (error: Error) => expect(error.message).toBe('Error al obtener posts'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('getPostsFromUser', () => {
    it('should get posts from user successfully', async () => {
      remoteDataSourceMock.getPostsFromUser.mockResolvedValue(
        right(mockDPosts)
      );

      const result = await repository.getPostsFromUser('123');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (dPosts: DPosts) => {
          expect(dPosts.items.length).toBe(1);
          expect(dPosts.items[0].userId).toBe('123');
        }
      )(result);
    });

    it('should handle error when getPostsFromUser fails', async () => {
      remoteDataSourceMock.getPostsFromUser.mockResolvedValue(
        left(new PostsError('Error al obtener posts del usuario'))
      );

      const result = await repository.getPostsFromUser('123');

      match(
        (error: Error) =>
          expect(error.message).toBe('Error al obtener posts del usuario'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('createPost', () => {
    it('should create post successfully', async () => {
      remoteDataSourceMock.createPost.mockResolvedValue(right(true));

      const result = await repository.createPost('Este es un nuevo post');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (value: boolean) => expect(value).toBe(true)
      )(result);
    });

    it('should handle error when createPost fails', async () => {
      remoteDataSourceMock.createPost.mockResolvedValue(
        left(new PostsError('Error al crear post'))
      );

      const result = await repository.createPost('Post fallido');

      match(
        (error: Error) => expect(error.message).toBe('Error al crear post'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
