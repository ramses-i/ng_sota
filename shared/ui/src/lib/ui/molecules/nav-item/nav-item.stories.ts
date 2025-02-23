import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NavItemComponent } from './nav-item.component';
import { LinkComponent } from '../../atoms/link/link.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<NavItemComponent> = {
  title: 'Molecules/NavItem',
  component: NavItemComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterModule.forChild([]), LinkComponent], // Usamos forChild() para evitar duplicación
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Mock de params vacíos
            queryParams: of({}), // Mock de queryParams vacíos
            snapshot: {
              paramMap: {
                get: () => null, // Devuelve null para cualquier parámetro
              },
              queryParamMap: {
                get: () => null, // Devuelve null para cualquier queryParam
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
      defaultValue: 'Home',
    },
  },
};

export default meta;
type Story = StoryObj<NavItemComponent>;

export const Default: Story = {
  args: {
    link: '/',
    label: 'Home',
  },
};

export const ExternalLink: Story = {
  args: {
    link: 'https://angular.io/',
    label: 'Visita Angular',
  },
};
