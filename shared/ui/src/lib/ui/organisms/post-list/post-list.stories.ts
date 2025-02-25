import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PostListComponent } from './post-list.component';
import { PostComponent } from '../../molecules/post/post.component';

const meta: Meta<PostListComponent> = {
  title: 'Organisms/PostList',
  component: PostListComponent,
  decorators: [
    moduleMetadata({
      imports: [PostComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    posts: {
      control: 'object',
      description: 'Lista de posts a mostrar',
    },
  },
};

export default meta;
type Story = StoryObj<PostListComponent>;

export const Default: Story = {
  args: {
    posts: {
      items: [
        {
          id: '1',
          publishDate: '2025-02-16T23:10:50.336217+00:00',
          content: 'Este es un post de prueba con contenido ficticio.',
          user: {
            id: '1',
            name: 'User',
            avatar: 'https://i.pravatar.cc/300',
          },
        },
        {
          id: '2',
          publishDate: '2025-02-16T23:52:38.095572+00:00',
          content: 'Probando la nueva sintaxis de @for en Angular 19.',
          user: {
            id: '1',
            name: 'User',
            avatar: 'https://i.pravatar.cc/300',
          },
        },
      ],
    },
  },
};

export const Empty: Story = {
  args: {
    posts: {
      items: [],
    },
  },
};
