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
                RouterModule.forChild([]),  // Usamos forChild() para evitar duplicaciones
                UserProfileButtonComponent,
                NavItemComponent,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({}),  // Mock de params vacíos
                        queryParams: of({}),  // Mock de queryParams vacíos
                        snapshot: {
                            paramMap: {
                                get: () => null,  // Devuelve null para cualquier parámetro
                            },
                            queryParamMap: {
                                get: () => null,  // Devuelve null para cualquier queryParam
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
