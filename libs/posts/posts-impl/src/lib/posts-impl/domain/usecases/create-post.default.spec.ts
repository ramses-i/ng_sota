import { TestBed } from '@angular/core/testing';
import { CreatePostUseCaseDefault } from './create-post.default';
import { PostsRepository } from '../repository/posts.repository';
import { left, match, right } from 'fp-ts/lib/Either';
import { GetAuthUserIdUseCase } from '@ng-sota/auth-api';

describe('CreatePostUseCaseDefault', () => {
  let useCase: CreatePostUseCaseDefault;
  let postsRepositoryMock: jest.Mocked<PostsRepository>;
  let getUserIdMock: jest.Mocked<GetAuthUserIdUseCase>;

  beforeEach(() => {
    postsRepositoryMock = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<PostsRepository>;

    getUserIdMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetAuthUserIdUseCase>;

    TestBed.configureTestingModule({
      providers: [
        CreatePostUseCaseDefault,
        { provide: PostsRepository, useValue: postsRepositoryMock },
        { provide: GetAuthUserIdUseCase, useValue: getUserIdMock },
      ],
    });

    useCase = TestBed.inject(CreatePostUseCaseDefault);
  });

  describe('execute', () => {
    it('should create a post successfully', async () => {
      getUserIdMock.execute.mockReturnValue('123');
      postsRepositoryMock.createPost.mockResolvedValue(right(true));

      const result = await useCase.execute('Nuevo post');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (isCreated: boolean) => expect(isCreated).toBe(true)
      )(result);

      expect(getUserIdMock.execute).toHaveBeenCalled();
      expect(postsRepositoryMock.createPost).toHaveBeenCalledWith(
        '123',
        'Nuevo post'
      );
    });

    it('should return error if createPost fails', async () => {
      getUserIdMock.execute.mockReturnValue('123');
      postsRepositoryMock.createPost.mockResolvedValue(
        left(new Error('Failed to create post'))
      );

      const result = await useCase.execute('Nuevo post');

      match(
        (error: Error) => expect(error.message).toBe('Failed to create post'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
