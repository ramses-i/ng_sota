import { Post, Posts } from '@ng-sota/feed-domain';
import { PostResponse } from '../model/response/post.response';

export function PostsResponseToDomain(postsResponse: PostResponse[]): Posts {
  const result: Post[] = [];
  postsResponse.map((post) => {
    result.push(PostResponseToPost(post));
  });
  return {
    items: result,
  };
}

function PostResponseToPost(postResponse: PostResponse): Post {
  return {
    id: postResponse.id,
    userId: postResponse.user_id,
    content: postResponse.content,
    createdAt: postResponse.created_at,
  };
}
