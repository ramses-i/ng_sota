import { Meta, StoryFn } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
} as Meta<ButtonComponent>;

const Template: StoryFn<ButtonComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Sign in',
};
