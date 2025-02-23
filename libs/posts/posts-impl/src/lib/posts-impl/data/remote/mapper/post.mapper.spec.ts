import { PostsResponseToDomain, PostResponseToPost } from './post.mapper';
import { PostResponse } from '../model/response/post.response';
import { DPosts, DPost } from '@ng-sota/posts-api';

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
      // GIVEN: Un array de PostResponse
      const postResponseArray: PostResponse[] = mockPostResponse;

      // WHEN: Se ejecuta el mapper
      const result: DPosts = PostsResponseToDomain(postResponseArray);

      // THEN: El resultado debe ser un DPosts con los datos mapeados correctamente
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
      // GIVEN: Un array vacío
      const postResponseArray: PostResponse[] = [];

      // WHEN: Se ejecuta el mapper
      const result: DPosts = PostsResponseToDomain(postResponseArray);

      // THEN: El resultado debe ser un DPosts vacío
      expect(result.items.length).toBe(0);
    });
  });

  describe('PostResponseToPost', () => {
    it('should map a single PostResponse to DPost', () => {
      // GIVEN: Un objeto PostResponse
      const postResponse: PostResponse = mockPostResponse[0];

      // WHEN: Se ejecuta el mapper para un solo objeto
      const result: DPost = PostResponseToPost(postResponse);

      // THEN: El resultado debe ser un DPost con los datos mapeados correctamente
      expect(result).toEqual({
        id: '1',
        userId: '123',
        content: 'Este es un post de prueba',
        createdAt: '2024-02-23T10:00:00Z',
      });
    });
  });
});
