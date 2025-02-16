import { Meta, StoryFn } from '@storybook/angular';
import { InputFieldComponent } from './input-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Atoms/InputField',
  component: InputFieldComponent,
} as Meta<InputFieldComponent>;

const Template: StoryFn<InputFieldComponent> = (args) => ({
  props: {
    ...args,
    control: new FormControl(''),
  },
  moduleMetadata: {
    imports: [ReactiveFormsModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'Email',
  id: 'email',
  type: 'email',
  placeholder: 'name@company.com',
};
