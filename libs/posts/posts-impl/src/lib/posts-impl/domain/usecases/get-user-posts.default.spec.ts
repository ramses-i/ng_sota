import { TestBed } from '@angular/core/testing';
import { GetUserPostsUseCaseDefault } from './get-user-posts.default';
import { PostsRepository } from '../repository/posts.repository';
import { left, match, right } from 'fp-ts/lib/Either';
import { DPosts } from '@ng-sota/posts-api';

describe('GetUserPostsUseCaseDefault', () => {
  let useCase: GetUserPostsUseCaseDefault;
  let postsRepositoryMock: jest.Mocked<PostsRepository>;

  const mockUserId = '123';
  const mockDPosts: DPosts = {
    items: [
      {
        id: '1',
        userId: mockUserId,
        content: 'Este es un post de prueba del usuario',
        createdAt: '2024-02-23T10:00:00Z',
      },
    ],
  };

  beforeEach(() => {
    postsRepositoryMock = {
      getPostsFromUser: jest.fn(),
    } as unknown as jest.Mocked<PostsRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetUserPostsUseCaseDefault,
        { provide: PostsRepository, useValue: postsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetUserPostsUseCaseDefault);
  });

  describe('execute', () => {
    it('should get user posts successfully', async () => {
      postsRepositoryMock.getPostsFromUser.mockResolvedValue(right(mockDPosts));

      const result = await useCase.execute(mockUserId);

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          expect(posts.items[0].userId).toBe(mockUserId);
          expect(posts.items[0].content).toBe(
            'Este es un post de prueba del usuario'
          );
        }
      )(result);

      expect(postsRepositoryMock.getPostsFromUser).toHaveBeenCalledWith(
        mockUserId
      );
    });

    it('should return error when repository fails', async () => {
      postsRepositoryMock.getPostsFromUser.mockResolvedValue(
        left(new Error('Error al obtener posts del usuario'))
      );

      const result = await useCase.execute(mockUserId);

      match(
        (error: Error) =>
          expect(error.message).toBe('Error al obtener posts del usuario'),
        () => fail('Expected error but got success')
      )(result);

      expect(postsRepositoryMock.getPostsFromUser).toHaveBeenCalledWith(
        mockUserId
      );
    });

    it('should handle unexpected errors', async () => {
      postsRepositoryMock.getPostsFromUser.mockRejectedValue(
        new Error('Unexpected error')
      );

      await expect(useCase.execute(mockUserId)).rejects.toThrow(
        'Unexpected error'
      );

      expect(postsRepositoryMock.getPostsFromUser).toHaveBeenCalledWith(
        mockUserId
      );
    });
  });
});
