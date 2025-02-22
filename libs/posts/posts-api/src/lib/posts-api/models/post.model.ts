export interface DPosts {
  readonly items: DPost[];
}

export interface DPost {
  readonly id: string;
  readonly userId: string;
  readonly content: string;
  readonly createdAt: string;
}
