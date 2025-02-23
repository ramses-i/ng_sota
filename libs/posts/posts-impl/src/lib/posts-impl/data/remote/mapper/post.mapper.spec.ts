import { PostResponseToPost, PostsResponseToDomain } from './post.mapper';
import { PostResponse } from '../model/response/post.response';
import { DPost, DPosts } from '@ng-sota/posts-api';

describe('PostsResponseToDomain', () => {
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
  ];

  describe('PostsResponseToDomain', () => {
    it('should map PostResponse array to DPosts correctly', () => {
      const result: DPosts = PostsResponseToDomain(mockPostResponse);

      expect(result.items.length).toBe(2);

      expect(result.items[0]).toEqual({
        id: '1',
        userId: '123',
        content: 'Este es un post de prueba',
        createdAt: '2024-02-23T10:00:00Z',
      });

      expect(result.items[1]).toEqual({
        id: '2',
        userId: '456',
        content: 'Otro post de prueba',
        createdAt: '2024-02-22T09:00:00Z',
      });
    });

    it('should return an empty array when input is empty', () => {
      const postResponseArray: PostResponse[] = [];

      const result: DPosts = PostsResponseToDomain(postResponseArray);

      expect(result.items.length).toBe(0);
    });
  });

  describe('PostResponseToPost', () => {
    it('should map a single PostResponse to DPost', () => {
      const postResponse: PostResponse = mockPostResponse[0];

      const result: DPost = PostResponseToPost(postResponse);

      expect(result).toEqual({
        id: '1',
        userId: '123',
        content: 'Este es un post de prueba',
        createdAt: '2024-02-23T10:00:00Z',
      });
    });
  });
});
