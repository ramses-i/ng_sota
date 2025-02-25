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
        RouterModule.forChild([]),
        NavbarComponent,
        PostFormComponent,
        PostListComponent,
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
type Story = StoryObj<FeedTemplateComponent>;

export const Default: Story = {};
