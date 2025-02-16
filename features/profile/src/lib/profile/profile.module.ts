import { NgModule } from '@angular/core';

import { ProfileDataModule } from '@ng-sota/profile-data';
import { ProfileDomainModule } from '@ng-sota/profile-domain';
import { ProfilePresentationModule } from '@ng-sota/profile-presentation';

@NgModule({
  declarations: [],
  imports: [ProfileDataModule, ProfileDomainModule, ProfilePresentationModule],
})
export class ProfileModule {}
