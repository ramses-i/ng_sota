import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { UserProfileButtonComponent } from '../../molecules/user-profile/user-profile.component';
import { NavItemComponent } from '../../molecules/nav-item/nav-item.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<NavbarComponent> = {
  title: 'Organisms/Navbar',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RouterModule.forChild([]),
        UserProfileButtonComponent,
        NavItemComponent,
      ],
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
};

export default meta;
type Story = StoryObj<NavbarComponent>;

export const Default: Story = {};
