export interface Posts {
  readonly items: Post[];
}

export interface User {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

export interface Post {
  readonly id: string;
  readonly user: User;
  readonly content: string;
  readonly publishDate: string;
}
