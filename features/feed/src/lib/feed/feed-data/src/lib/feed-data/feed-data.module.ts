import { NgModule } from '@angular/core';
import { FeedRepositoryDefault } from './feed-repository.default';
import { FeedRepository } from '@ng-sota/feed-domain';
import { FeedRemoteDataSource } from './feed-remote.default';
import { FeedRemoteDataSourceDefault } from './remote/feed-remote.default';

@NgModule({
  providers: [
    /* Dependency Injection */
    {
      provide: FeedRepository,
      useClass: FeedRepositoryDefault,
    },
    {
      provide: FeedRemoteDataSource,
      useClass: FeedRemoteDataSourceDefault,
    },
  ],
})
export class FeedDataModule {}
