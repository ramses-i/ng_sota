import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { LinkComponent } from './link.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const meta: Meta<LinkComponent> = {
    title: 'Atoms/Link',
    component: LinkComponent,
    decorators: [
        moduleMetadata({
            imports: [RouterModule.forChild([])],  // Usamos forChild() para evitar duplicación del Router
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
