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
          createdAt: '2025-02-16T23:10:50.336217+00:00',
          content: 'Este es un post de prueba con contenido ficticio.',
          userId: '66e72be7-cbed-4f90-81eb-8ef0ca074a71',
        },
        {
          id: '2',
          createdAt: '2025-02-16T23:52:38.095572+00:00',
          content: 'Probando la nueva sintaxis de @for en Angular 19.',
          userId: '57ee09a9-0588-4abb-9fe7-93778e945693',
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
