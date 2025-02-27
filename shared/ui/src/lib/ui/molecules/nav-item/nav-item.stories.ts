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
      imports: [RouterModule.forChild([]), LinkComponent],
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
