import { DPost, DPosts } from '@ng-sota/posts-api';
import { Post, Posts } from '@ng-sota/ui';

export function DPostsToPosts(posts: DPosts): Posts {
  const result: Post[] = [];
  posts.items.forEach((post) => {
    result.push(DPostToPost(post));
  });
  return {
    items: result,
  };
}

export function DPostToPost(post: DPost): Post {
  const user = {
    id: post.userId,
    name: post.userName,
    avatar: post.userAvatar,
  };
  return {
    id: post.id,
    user: user,
    content: post.content,
    publishDate: post.createdAt,
  };
}
