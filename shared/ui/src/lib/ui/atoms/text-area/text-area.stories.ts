import { Meta, StoryObj } from '@storybook/angular';
import { TextAreaComponent } from './text-area.component';

const meta: Meta<TextAreaComponent> = {
  title: 'Atoms/TextArea',
  component: TextAreaComponent,
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de filas en el área de texto',
      defaultValue: 4,
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder dentro del textarea',
      defaultValue: 'Write a post...',
    },
  },
};

export default meta;
type Story = StoryObj<TextAreaComponent>;

export const Default: Story = {
  args: {
    rows: 4,
    placeholder: 'Write a post...',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    rows: 6,
    placeholder: 'Escribe tu comentario aquí...',
  },
};

export const ShortTextArea: Story = {
  args: {
    rows: 2,
    placeholder: 'Mensaje corto...',
  },
};
