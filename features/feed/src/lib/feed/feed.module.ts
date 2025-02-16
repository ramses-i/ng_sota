import { NgModule } from '@angular/core';
import { FeedPresentationModule } from '@ng-sota/feed-presentation';
import { FeedDataModule } from '@ng-sota/feed-data';
import { FeedDomainModule } from '@ng-sota/feed-domain';

@NgModule({
  declarations: [],
  imports: [FeedDataModule, FeedDomainModule, FeedPresentationModule],
})
export class FeedModule {}
