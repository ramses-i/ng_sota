import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FeedTemplateComponent } from './feed-tpl.component';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { PostFormComponent } from '../../organisms/post-form/post-form.component';
import { PostListComponent } from '../../organisms/post-list/post-list.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<FeedTemplateComponent> = {
    title: 'Templates/FeedTemplate',
    component: FeedTemplateComponent,
    decorators: [
        moduleMetadata({
            imports: [
                RouterModule.forChild([]), // Usamos forChild() para evitar duplicaciones
                NavbarComponent,
                PostFormComponent,
                PostListComponent,
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
type Story = StoryObj<FeedTemplateComponent>;

export const Default: Story = {};
