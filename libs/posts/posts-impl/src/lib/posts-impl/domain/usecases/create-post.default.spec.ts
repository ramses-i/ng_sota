import { TestBed } from '@angular/core/testing';
import { CreatePostUseCaseDefault } from './create-post.default';
import { PostsRepository } from '../repository/posts.repository';
import { left, match, right } from 'fp-ts/lib/Either';

describe('CreatePostUseCaseDefault', () => {
  let useCase: CreatePostUseCaseDefault;
  let postsRepositoryMock: jest.Mocked<PostsRepository>;

  const postContent = 'Este es un nuevo post de prueba';

  beforeEach(() => {
    postsRepositoryMock = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<PostsRepository>;

    TestBed.configureTestingModule({
      providers: [
        CreatePostUseCaseDefault,
        { provide: PostsRepository, useValue: postsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(CreatePostUseCaseDefault);
  });

  describe('execute', () => {
    it('should create post successfully', async () => {
      postsRepositoryMock.createPost.mockResolvedValue(right(true));

      const result = await useCase.execute(postContent);

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (success: boolean) => expect(success).toBe(true)
      )(result);

      expect(postsRepositoryMock.createPost).toHaveBeenCalledWith(postContent);
    });

    it('should return error when post creation fails', async () => {
      postsRepositoryMock.createPost.mockResolvedValue(
        left(new Error('Error al crear el post'))
      );

      const result = await useCase.execute(postContent);

      match(
        (error: Error) => expect(error.message).toBe('Error al crear el post'),
        () => fail('Expected error but got success')
      )(result);

      expect(postsRepositoryMock.createPost).toHaveBeenCalledWith(postContent);
    });

    it('should handle unexpected errors', async () => {
      postsRepositoryMock.createPost.mockRejectedValue(
        new Error('Unexpected error')
      );

      await expect(useCase.execute(postContent)).rejects.toThrow(
        'Unexpected error'
      );

      expect(postsRepositoryMock.createPost).toHaveBeenCalledWith(postContent);
    });
  });
});
