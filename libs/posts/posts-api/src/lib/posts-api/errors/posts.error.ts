export class PostsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PostsError';
  }
}
