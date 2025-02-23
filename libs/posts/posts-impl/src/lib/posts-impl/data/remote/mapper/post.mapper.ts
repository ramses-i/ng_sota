import { PostResponse } from '../model/response/post.response';
import { DPost, DPosts } from '@ng-sota/posts-api';

export function PostsResponseToDomain(postsResponse: PostResponse[]): DPosts {
  const result: DPost[] = [];
  postsResponse.map((post) => {
    result.push(PostResponseToPost(post));
  });
  return {
    items: result,
  };
}

export function PostResponseToPost(postResponse: PostResponse): DPost {
  return {
    id: postResponse.id,
    createdAt: postResponse.created_at,
    content: postResponse.content,
    userId: postResponse.user_id,
    userAvatar: postResponse.avatar,
    userName: postResponse.display_name,
  };
}
