import { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Atoms/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen para el avatar',
      defaultValue: 'https://i.pravatar.cc/150',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150',
  },
};

export const CustomAvatar: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/9919?v=4',
  },
};
