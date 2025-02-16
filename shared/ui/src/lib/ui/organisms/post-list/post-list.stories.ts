import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PostListComponent } from './post-list.component';
import { PostComponent } from '../../molecules/post/post.component';

const meta: Meta<PostListComponent> = {
    title: 'Organisms/PostList',
    component: PostListComponent,
    decorators: [
        moduleMetadata({
            imports: [PostComponent], // Importa el componente interno PostComponent
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PostListComponent>;

export const Default: Story = {};
