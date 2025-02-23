import { TestBed } from '@angular/core/testing';
import { PostsRemoteDataSourceDefault } from './posts-remote.default';
import { PostsService } from '@ng-sota/supabase';
import { match } from 'fp-ts/lib/Either';
import { PostgrestResponse } from '@supabase/supabase-js';
import { PostResponse } from './model/response/post.response';
import { HttpStatusCode } from 'axios';
import { DPosts } from '@ng-sota/posts-api';

describe('PostsRemoteDataSourceDefault', () => {
  let dataSource: PostsRemoteDataSourceDefault;
  let postsServiceMock: jest.Mocked<PostsService>;

  const mockPostResponse: PostResponse[] = [
    {
      id: '1',
      created_at: '2024-02-23T10:00:00Z',
      content: 'Este es un post de prueba',
      user_id: '123',
      user_email: 'user@example.com',
    },
    {
      id: '2',
      created_at: '2024-02-22T09:00:00Z',
      content: 'Otro post de prueba',
      user_id: '456',
      user_email: 'other@example.com',
    },
    {
      id: '3',
      created_at: '2024-02-23T10:00:00Z',
      content: 'Este es un post de prueba 2',
      user_id: '123',
      user_email: 'user@example.com',
    },
  ];

  const mockUserPostResponse: PostResponse[] = [
    {
      id: '1',
      created_at: '2024-02-23T10:00:00Z',
      content: 'Este es un post de prueba',
      user_id: '123',
      user_email: 'user@example.com',
    },
    {
      id: '3',
      created_at: '2024-02-23T10:00:00Z',
      content: 'Este es un post de prueba 2',
      user_id: '123',
      user_email: 'user@example.com',
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
    it('should get posts successfully', async () => {
      postsServiceMock.getPosts.mockResolvedValue({
        data: mockPostResponse,
        error: null,
      } as PostgrestResponse<PostResponse>);

      const result = await dataSource.getPosts();

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (dPosts: DPosts) => {
          expect(dPosts.items.length).toBe(3);
          expect(dPosts.items[0].id).toBe('1');
          expect(dPosts.items[0].content).toBe('Este es un post de prueba');
          expect(dPosts.items[1].id).toBe('2');
          expect(dPosts.items[1].content).toBe('Otro post de prueba');
          expect(dPosts.items[2].id).toBe('3');
          expect(dPosts.items[2].content).toBe('Este es un post de prueba 2');
        }
      )(result);
    });

    it('should handle error when getPosts service returns an error', async () => {
      postsServiceMock.getPosts.mockResolvedValue({
        data: null,
        error: { message: 'Error al obtener posts' },
      } as PostgrestResponse<PostResponse>);

      const result = await dataSource.getPosts();

      match(
        (error: Error) => expect(error.message).toBe('Error al obtener posts'),
        () => fail('Expected error but got success')
      )(result);
    });

    it('should handle exception when an unexpected error occurs', async () => {
      postsServiceMock.getPosts.mockRejectedValue(
        new Error('Unexpected error')
      );

      const result = await dataSource.getPosts();

      match(
        (error: Error) => expect(error.message).toBe('getPosts Call Error 1'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('getPostsFromUser', () => {
    it('should get posts from user successfully', async () => {
      postsServiceMock.getPostsByUser.mockResolvedValue({
        data: mockUserPostResponse,
        error: null,
      } as PostgrestResponse<PostResponse>);

      const result = await dataSource.getPostsFromUser('123');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (dPosts: DPosts) => {
          expect(dPosts.items.length).toBe(2);
          expect(dPosts.items[0].userId).toBe('123');
          expect(dPosts.items[1].userId).toBe('123');
          expect(dPosts.items[0].content).toBe('Este es un post de prueba');
          expect(dPosts.items[1].content).toBe('Este es un post de prueba 2');
        }
      )(result);
    });

    it('should handle error when getPostsFromUser fails', async () => {
      postsServiceMock.getPostsByUser.mockResolvedValue({
        data: null,
        error: { message: 'Error al obtener posts del usuario' },
      } as PostgrestResponse<PostResponse>);

      const result = await dataSource.getPostsFromUser('123');

      match(
        (error: Error) =>
          expect(error.message).toBe('Error al obtener posts del usuario'),
        () => fail('Expected error but got success')
      )(result);
    });
  });

  describe('createPost', () => {
    it('should create post successfully when status is Created', async () => {
      postsServiceMock.createPost.mockResolvedValue({
        status: HttpStatusCode.Created,
        data: [
          {
            id: '1',
            created_at: '2024-02-23T10:00:00Z',
            content: 'Este es un post de prueba',
            user_id: '123',
            user_email: 'user@example.com',
          },
        ],
        error: null,
      } as PostgrestResponse<PostResponse>);

      const result = await dataSource.createPost('Este es un nuevo post');

      match(
        (error: Error) =>
          fail(`Expected success but got error: ${error.message}`),
        (value: boolean) => expect(value).toBe(true)
      )(result);
    });

    it('should return false when post creation fails (status not Created)', async () => {
      postsServiceMock.createPost.mockResolvedValue({
        status: HttpStatusCode.BadRequest,
        data: null,
        error: { message: 'Error al crear post' },
      } as PostgrestResponse<PostResponse>);

      const result = await dataSource.createPost('Post fallido');

      match(
        (error: Error) => expect(error.message).toBe('Error al crear post'),
        () => fail('Expected error but got success')
      )(result);
    });

    it('should handle exception when post creation throws an error', async () => {
      postsServiceMock.createPost.mockRejectedValue(
        new Error('Unexpected error')
      );

      const result = await dataSource.createPost('Post fallido');

      match(
        (error: Error) => expect(error.message).toBe('createPost Call Error 1'),
        () => fail('Expected error but got success')
      )(result);
    });
  });
});
