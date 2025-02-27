import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FeedTemplateComponent } from './feed-tpl.component';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { PostFormComponent } from '../../organisms/post-form/post-form.component';
import { PostListComponent } from '../../organisms/post-list/post-list.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<FeedTemplateComponent> = {
  title: 'Templates/FeedTemplate',
  component: FeedTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        NavbarComponent,
        PostFormComponent,
        PostListComponent,
        SpinnerComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: () => null,
              },
              queryParamMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }),
  ],
  args: {
    avatar: 'https://i.pravatar.cc/150',
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
    isLoading: false,
  },
  argTypes: {
    avatar: { control: 'text', description: 'URL del avatar' },
    posts: { control: 'object', description: 'Lista de publicaciones' },
    isLoading: { control: 'boolean', description: 'Estado de carga' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FeedTemplateComponent>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    posts: {
      items: [],
    },
  },
};

export const EmptyPosts: Story = {
  args: {
    posts: {
      items: [],
    },
  },
};

export const WithCustomAvatar: Story = {
  args: {
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
};
