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

function PostResponseToPost(postResponse: PostResponse): DPost {
  return {
    id: postResponse.id,
    userId: postResponse.user_id,
    content: postResponse.content,
    createdAt: postResponse.created_at,
  };
}
