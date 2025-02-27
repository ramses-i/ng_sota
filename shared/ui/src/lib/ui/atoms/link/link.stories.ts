import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { LinkComponent } from './link.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<LinkComponent> = {
  title: 'Atoms/Link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterModule.forChild([])],
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
    link: {
      control: 'text',
      description: 'URL o ruta del enlace',
      defaultValue: '/',
    },
    label: {
      control: 'text',
      description: 'Texto visible del enlace',
      defaultValue: 'Click aquí',
    },
    className: {
      control: 'text',
      description: 'Clases CSS para estilos personalizados',
      defaultValue: 'text-primary-600',
    },
  },
};

export default meta;
type Story = StoryObj<LinkComponent>;

export const Default: Story = {
  args: {
    link: '/',
    label: 'Home',
    className: 'text-primary-600 hover:underline',
  },
};

export const ExternalLink: Story = {
  args: {
    link: 'https://angular.io/',
    label: 'Visita Angular',
    className: 'text-blue-500 font-bold hover:text-blue-700',
  },
};
