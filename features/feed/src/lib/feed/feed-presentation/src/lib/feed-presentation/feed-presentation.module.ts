import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeedMainComponent } from './pages/main/feed-main.component';
import { FeedPresentationComponent } from './feed-presentation.component';
import { FeedMainFacade } from './pages/main/feed-main.facade';

const routes: Routes = [
  {
    path: '',
    component: FeedPresentationComponent,
    children: [{ path: '', component: FeedMainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FeedMainFacade],
})
export class FeedPresentationModule {}
