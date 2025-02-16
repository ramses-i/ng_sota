import { Meta, StoryFn } from '@storybook/angular';
import { FormFieldComponent } from './form-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Molecules/FormField',
  component: FormFieldComponent,
} as Meta<FormFieldComponent>;

const Template: StoryFn<FormFieldComponent> = (args) => ({
  component: FormFieldComponent,
  props: {
    ...args,
    control: new FormControl(''), // Simulamos el FormControl en Storybook
  },
  moduleMetadata: {
    imports: [ReactiveFormsModule], // Aseguramos que Angular maneje los formularios
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'Email',
  id: 'email',
  type: 'email',
  placeholder: 'name@company.com',
  error: '',
};
