import { TestBed } from '@angular/core/testing';
import { FeedMainFacade } from './feed-main.facade';
import {
  CreatePostUseCase,
  DPosts,
  GetPostsUseCase,
  PostsError,
} from '@ng-sota/posts-api';
import { left, right } from 'fp-ts/Either';

describe('FeedMainFacade', () => {
  let facade: FeedMainFacade;
  let getPostsMock: jest.Mocked<GetPostsUseCase>;
  let createPostMock: jest.Mocked<CreatePostUseCase>;

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
    getPostsMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPostsUseCase>;

    createPostMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreatePostUseCase>;

    TestBed.configureTestingModule({
      providers: [
        FeedMainFacade,
        { provide: GetPostsUseCase, useValue: getPostsMock },
        { provide: CreatePostUseCase, useValue: createPostMock },
      ],
    });

    facade = TestBed.inject(FeedMainFacade);
  });

  describe('getFeed', () => {
    it('should load posts successfully', async () => {
      getPostsMock.execute.mockResolvedValue(right(mockDPosts));

      await facade.getFeed();

      expect(facade.isLoading()).toBe(false);
      expect(facade.errorMessage()).toBeNull();
      expect(facade.posts().items.length).toBe(1);
      const post = facade.posts().items[0];
      expect(post.id).toBe('1');
      expect(post.content).toBe('Post de prueba');
      expect(post.user.avatar).toBe('https://example.com/avatar.png');
      expect(post.user.name).toBe('Test User');
      expect(getPostsMock.execute).toHaveBeenCalled();
    });

    it('should handle error when loading posts', async () => {
      getPostsMock.execute.mockResolvedValue(
        left(new PostsError('Failed to load posts'))
      );

      await facade.getFeed();

      expect(facade.isLoading()).toBe(false);
      expect(facade.errorMessage()).toBe('Failed to load posts');
      expect(facade.posts().items.length).toBe(0);
    });
  });

  describe('publishPost', () => {
    it('should publish a post successfully and reload feed', async () => {
      createPostMock.execute.mockResolvedValue(right(true));
      getPostsMock.execute.mockResolvedValue(right(mockDPosts));

      await facade.publishPost('Nuevo post');

      expect(createPostMock.execute).toHaveBeenCalledWith('Nuevo post');
      expect(getPostsMock.execute).toHaveBeenCalled();
      expect(facade.posts().items.length).toBe(1);
    });

    it('should handle error when publishing post', async () => {
      createPostMock.execute.mockResolvedValue(
        left(new PostsError('Failed to create post'))
      );

      await facade.publishPost('Nuevo post');

      expect(facade.errorMessage()).toBe('Failed to create post');
    });

    it('should show message if post creation fails', async () => {
      createPostMock.execute.mockResolvedValue(right(false));

      await facade.publishPost('Nuevo post');

      expect(facade.errorMessage()).toBe(
        'Could not create post, please try again later.'
      );
    });
  });

  describe('avatar signal', () => {
    it('should have default avatar', () => {
      expect(facade.avatar()).toBe('https://i.pravatar.cc/300');
    });
  });
});
