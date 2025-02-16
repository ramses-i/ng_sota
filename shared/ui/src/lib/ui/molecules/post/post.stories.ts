import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PostComponent } from './post.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';

const meta: Meta<PostComponent> = {
    title: 'Molecules/Post',
    component: PostComponent,
    decorators: [
        moduleMetadata({
            imports: [AvatarComponent], // Importa AvatarComponent porque se usa dentro de PostComponent
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        avatarUrl: {
            control: 'text',
            description: 'URL de la imagen de avatar',
            defaultValue: 'https://i.pravatar.cc/150',
        },
        username: {
            control: 'text',
            description: 'Nombre del usuario que publica',
            defaultValue: 'John Doe',
        },
        date: {
            control: 'date',
            description: 'Fecha del post',
            defaultValue: new Date().toISOString(),
        },
        content: {
            control: 'text',
            description: 'Contenido del post',
            defaultValue: 'Este es un post de prueba en Storybook.',
        },
    },
};

export default meta;
type Story = StoryObj<PostComponent>;

export const Default: Story = {
    args: {
        avatarUrl: 'https://i.pravatar.cc/150',
        username: 'John Doe',
        date: new Date().toISOString(),
        content: 'Este es un post de prueba en Storybook.',
    },
};

export const CustomPost: Story = {
    args: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
        username: 'GitHub User',
        date: '2024-02-16T12:00:00Z',
        content: 'Este es un post personalizado con una imagen de usuario de GitHub.',
    },
};
