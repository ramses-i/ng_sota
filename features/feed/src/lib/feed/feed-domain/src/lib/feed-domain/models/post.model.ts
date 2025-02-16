export interface Posts {
  readonly items: Post[];
}

export interface Post {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: string;
}
