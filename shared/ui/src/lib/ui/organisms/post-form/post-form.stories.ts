import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PostFormComponent } from './post-form.component';
import { TextAreaComponent } from '../../atoms/text-area/text-area.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<PostFormComponent> = {
  title: 'Molecules/PostForm',
  component: PostFormComponent,
  decorators: [
    moduleMetadata({
      imports: [TextAreaComponent, ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PostFormComponent>;

export const Default: Story = {};
