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
    it('should return posts successfully', async () => {
      postsRepositoryMock.getPosts.mockResolvedValue(right(mockDPosts));

      const result = await useCase.execute();

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

      expect(postsRepositoryMock.getPosts).toHaveBeenCalled();
    });

    it('should return error if getPosts fails', async () => {
      postsRepositoryMock.getPosts.mockResolvedValue(
        left(new Error('Failed to get posts'))
      );

      const result = await useCase.execute();

      match(
        (error: Error) => expect(error.message).toBe('Failed to get posts'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
