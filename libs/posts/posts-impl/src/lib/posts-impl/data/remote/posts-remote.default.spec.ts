import { TestBed } from '@angular/core/testing';
import { PostsRemoteDataSourceDefault } from './posts-remote.default';
import { PostsService } from '@ng-sota/supabase';
import { match } from 'fp-ts/lib/Either';
import { PostgrestResponse } from '@supabase/supabase-js';
import { PostResponse } from './model/response/post.response';
import { DPosts, PostsError } from '@ng-sota/posts-api';
import { HttpStatusCode } from '@angular/common/http';

describe('PostsRemoteDataSourceDefault', () => {
  let dataSource: PostsRemoteDataSourceDefault;
  let postsServiceMock: jest.Mocked<PostsService>;

  const mockPostsResponse: PostResponse[] = [
    {
      id: '1',
      user_id: '123',
      user_email: 'testuser@example.com',
      avatar: 'https://example.com/avatar.png',
      display_name: 'Test User',
      content: 'Post de prueba',
      created_at: '2024-02-23T10:00:00Z',
    },
  ];

  beforeEach(() => {
    postsServiceMock = {
      getPosts: jest.fn(),
      getPostsByUser: jest.fn(),
      createPost: jest.fn(),
    } as unknown as jest.Mocked<PostsService>;

    TestBed.configureTestingModule({
      providers: [
        PostsRemoteDataSourceDefault,
        { provide: PostsService, useValue: postsServiceMock },
      ],
    });

    dataSource = TestBed.inject(PostsRemoteDataSourceDefault);
  });

  describe('getPosts', () => {
    it('should get posts successfully with new DPost fields', async () => {
      const mockResponse: PostgrestResponse<PostResponse> = {
        data: mockPostsResponse,
        error: null,
        status: 200,
        statusText: 'OK',
        count: mockPostsResponse.length,
      };

      postsServiceMock.getPosts.mockResolvedValue(mockResponse);

      const result = await dataSource.getPosts();

      match(
        (error: PostsError) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          const post = posts.items[0];
          expect(post.id).toBe('1');
          expect(post.userId).toBe('123');
          expect(post.userAvatar).toBe('https://example.com/avatar.png');
          expect(post.userName).toBe('Test User');
          expect(post.content).toBe('Post de prueba');
          expect(post.createdAt).toBe('2024-02-23T10:00:00Z');
        }
      )(result);
    });

    it('should return error if getPosts fails', async () => {
      postsServiceMock.getPosts.mockRejectedValue(new Error('Network error'));

      const result = await dataSource.getPosts();

      match(
        (error: PostsError) =>
          expect(error.message).toBe('getPosts Call Error 1'),
        () => fail('Expected error but got success')
      )(result);
    });

    it('should return error if service returns an error response', async () => {
      const mockErrorResponse: PostgrestResponse<PostResponse> = {
        data: null,
        error: {
          message: 'Error retrieving posts',
          details: '',
          hint: '',
          code: '400',
          name: '',
        },
        status: 400,
        statusText: 'Bad Request',
        count: null,
      };

      postsServiceMock.getPosts.mockResolvedValue(mockErrorResponse);

      const result = await dataSource.getPosts();

      match(
        (error: PostsError) =>
          expect(error.message).toBe('Error retrieving posts'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('getPostsFromUser', () => {
    it('should get posts from a specific user with new DPost fields', async () => {
      const mockResponse: PostgrestResponse<PostResponse> = {
        data: mockPostsResponse,
        error: null,
        status: 200,
        statusText: 'OK',
        count: mockPostsResponse.length,
      };

      postsServiceMock.getPostsByUser.mockResolvedValue(mockResponse);

      const result = await dataSource.getPostsFromUser('123');

      match(
        (error: PostsError) =>
          fail(`Expected success but got error: ${error.message}`),
        (posts: DPosts) => {
          expect(posts.items.length).toBe(1);
          const post = posts.items[0];
          expect(post.id).toBe('1');
          expect(post.userId).toBe('123');
          expect(post.userAvatar).toBe('https://example.com/avatar.png');
          expect(post.userName).toBe('Test User');
          expect(post.content).toBe('Post de prueba');
        }
      )(result);
    });

    it('should return error if getPostsFromUser fails', async () => {
      postsServiceMock.getPostsByUser.mockRejectedValue(
        new Error('Network error')
      );

      const result = await dataSource.getPostsFromUser('123');

      match(
        (error: PostsError) =>
          expect(error.message).toBe('getPostsFromUser Call Error 1'),
        () => fail('Expected error but got success')
      )(result);
    });

    it('should return error if service returns an error response', async () => {
      const mockErrorResponse: PostgrestResponse<PostResponse> = {
        data: null,
        error: {
          message: 'User not found',
          code: '404',
          details: '',
          hint: '',
          name: '',
        },
        status: 404,
        statusText: 'Not Found',
        count: null,
      };

      postsServiceMock.getPostsByUser.mockResolvedValue(mockErrorResponse);

      const result = await dataSource.getPostsFromUser('123');

      match(
        (error: PostsError) => expect(error.message).toBe('User not found'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  // Test para createPost
  describe('createPost', () => {
    it('should create a post successfully', async () => {
      const mockResponse: PostgrestResponse<PostResponse> = {
        data: mockPostsResponse,
        error: null,
        status: HttpStatusCode.Created,
        statusText: 'Created',
        count: mockPostsResponse.length,
      };

      postsServiceMock.createPost.mockResolvedValue(mockResponse);

      const result = await dataSource.createPost('123', 'Nuevo post');

      match(
        (error: PostsError) =>
          fail(`Expected success but got error: ${error.message}`),
        (isCreated: boolean) => expect(isCreated).toBe(true)
      )(result);
    });

    it('should return error if createPost fails', async () => {
      postsServiceMock.createPost.mockRejectedValue(new Error('Network error'));

      const result = await dataSource.createPost('123', 'Nuevo post');

      match(
        (error: PostsError) =>
          expect(error.message).toBe('createPost Call Error 1'),
        () => fail('Expected error but got success')
      )(result);
    });

    it('should return error if service returns an error response', async () => {
      const mockErrorResponse: PostgrestResponse<PostResponse> = {
        data: null,
        error: {
          message: 'Failed to create post',
          code: '400',
          details: '',
          hint: '',
          name: '',
        },
        status: 400,
        statusText: 'Bad Request',
        count: null,
      };

      postsServiceMock.createPost.mockResolvedValue(mockErrorResponse);

      const result = await dataSource.createPost('123', 'Nuevo post');

      match(
        (error: PostsError) =>
          expect(error.message).toBe('Failed to create post'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
