export interface DPosts {
  readonly items: DPost[];
}

export interface DPost {
  readonly id: string;
  readonly createdAt: string;
  readonly content: string;
  readonly userId: string;
  readonly userAvatar: string;
  readonly userName: string;
}
