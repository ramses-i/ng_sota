import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UserProfileButtonComponent } from './user-profile.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<UserProfileButtonComponent> = {
  title: 'Molecules/UserProfileButton',
  component: UserProfileButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterModule.forChild([]), AvatarComponent],
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
  tags: ['autodocs'],
  argTypes: {
    avatarUrl: {
      control: 'text',
      description: 'URL de la imagen del avatar',
      defaultValue: 'https://i.pravatar.cc/150',
    },
    profileLink: {
      control: 'text',
      description: 'Ruta o URL del perfil de usuario',
      defaultValue: '/profile',
    },
  },
};

export default meta;
type Story = StoryObj<UserProfileButtonComponent>;

export const Default: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150',
    profileLink: '/profile',
  },
};

export const CustomUser: Story = {
  args: {
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
    profileLink: '/custom-profile',
  },
};
