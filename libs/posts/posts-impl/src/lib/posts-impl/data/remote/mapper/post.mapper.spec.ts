import { PostResponseToPost, PostsResponseToDomain } from './post.mapper';
import { PostResponse } from '../model/response/post.response';
import { DPost, DPosts } from '@ng-sota/posts-api';

describe('Post Mappers', () => {
  const mockPostResponse: PostResponse = {
    id: '1',
    created_at: '2024-02-23T10:00:00Z',
    content: 'Post de prueba',
    user_id: '123',
    user_email: 'testuser@example.com',
    avatar: 'https://example.com/avatar.png',
    display_name: 'Test User',
  };

  describe('PostResponseToPost', () => {
    it('should convert PostResponse to DPost correctly', () => {
      const result: DPost = PostResponseToPost(mockPostResponse);

      expect(result.id).toBe('1');
      expect(result.createdAt).toBe('2024-02-23T10:00:00Z');
      expect(result.content).toBe('Post de prueba');
      expect(result.userId).toBe('123');
      expect(result.userAvatar).toBe('https://example.com/avatar.png');
      expect(result.userName).toBe('Test User');
    });

    it('should handle empty PostResponse without errors', () => {
      const emptyResponse: PostResponse = {
        id: '',
        created_at: '',
        content: '',
        user_id: '',
        user_email: '',
        avatar: '',
        display_name: '',
      };

      const result: DPost = PostResponseToPost(emptyResponse);

      expect(result.id).toBe('');
      expect(result.createdAt).toBe('');
      expect(result.content).toBe('');
      expect(result.userId).toBe('');
      expect(result.userAvatar).toBe('');
      expect(result.userName).toBe('');
    });
  });

  describe('PostsResponseToDomain', () => {
    it('should convert an array of PostResponse to DPosts', () => {
      const mockPostsResponse: PostResponse[] = [mockPostResponse];

      const result: DPosts = PostsResponseToDomain(mockPostsResponse);

      expect(result.items.length).toBe(1);
      const post = result.items[0];

      expect(post.id).toBe('1');
      expect(post.createdAt).toBe('2024-02-23T10:00:00Z');
      expect(post.content).toBe('Post de prueba');
      expect(post.userId).toBe('123');
      expect(post.userAvatar).toBe('https://example.com/avatar.png');
      expect(post.userName).toBe('Test User');
    });

    it('should handle empty array without errors', () => {
      const result: DPosts = PostsResponseToDomain([]);

      expect(result.items.length).toBe(0);
    });

    it('should handle multiple PostResponse objects correctly', () => {
      const mockPostsResponse: PostResponse[] = [
        {
          id: '1',
          created_at: '2024-02-23T10:00:00Z',
          content: 'Post de prueba 1',
          user_id: '123',
          user_email: 'testuser1@example.com',
          avatar: 'https://example.com/avatar1.png',
          display_name: 'Test User 1',
        },
        {
          id: '2',
          created_at: '2024-02-24T11:00:00Z',
          content: 'Post de prueba 2',
          user_id: '456',
          user_email: 'testuser2@example.com',
          avatar: 'https://example.com/avatar2.png',
          display_name: 'Test User 2',
        },
      ];

      const result: DPosts = PostsResponseToDomain(mockPostsResponse);

      expect(result.items.length).toBe(2);

      const post1 = result.items[0];
      expect(post1.id).toBe('1');
      expect(post1.userName).toBe('Test User 1');
      expect(post1.userAvatar).toBe('https://example.com/avatar1.png');

      const post2 = result.items[1];
      expect(post2.id).toBe('2');
      expect(post2.userName).toBe('Test User 2');
      expect(post2.userAvatar).toBe('https://example.com/avatar2.png');
    });
  });
});
