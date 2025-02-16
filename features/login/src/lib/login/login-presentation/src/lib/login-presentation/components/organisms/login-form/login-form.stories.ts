import { Meta, StoryFn } from '@storybook/angular';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Organisms/LoginForm',
  component: LoginFormComponent,
} as Meta<LoginFormComponent>;

const Template: StoryFn<LoginFormComponent> = (args) => ({
  component: LoginFormComponent,
  props: args,
  moduleMetadata: {
    imports: [ReactiveFormsModule],
  },
});

export const Default = Template.bind({});
Default.args = {};
