import { TestBed } from '@angular/core/testing';
import { GetPostsUseCaseDefault } from './get-posts.default';
import { PostsRepository } from '../repository/posts.repository';
import { left, match, right } from 'fp-ts/lib/Either';
import { DPosts } from '@ng-sota/posts-api';

describe('GetPostsUseCaseDefault', () => {
  let useCase: GetPostsUseCaseDefault;
  let postsRepositoryMock: jest.Mocked<PostsRepository>;

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
    postsRepositoryMock = {
      getPosts: jest.fn(),
    } as unknown as jest.Mocked<PostsRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetPostsUseCaseDefault,
        { provide: PostsRepository, useValue: postsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetPostsUseCaseDefault);
  });

  describe('execute', () => {
    it('should get posts successfully', async () => {
      postsRepositoryMock.getPosts.mockResolvedValue(right(mockDPosts));

      const result = await useCase.execute();

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          expect(posts.items[0].id).toBe('1');
          expect(posts.items[0].content).toBe('Este es un post de prueba');
        }
      )(result);

      expect(postsRepositoryMock.getPosts).toHaveBeenCalled();
    });

    it('should return error when repository fails', async () => {
      postsRepositoryMock.getPosts.mockResolvedValue(
        left(new Error('Error al obtener posts'))
      );

      const result = await useCase.execute();

      match(
        (error: Error) => expect(error.message).toBe('Error al obtener posts'),
        () => fail('Expected error but got success')
      )(result);

      expect(postsRepositoryMock.getPosts).toHaveBeenCalled();
    });

    it('should handle unexpected errors', async () => {
      postsRepositoryMock.getPosts.mockRejectedValue(
        new Error('Unexpected error')
      );

      await expect(useCase.execute()).rejects.toThrow('Unexpected error');

      expect(postsRepositoryMock.getPosts).toHaveBeenCalled();
    });
  });
});
