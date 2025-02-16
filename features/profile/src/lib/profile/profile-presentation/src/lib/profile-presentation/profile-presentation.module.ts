import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileMainComponent } from './pages/main/profile-main.component';
import { ProfilePresentationComponent } from './profile-presentation.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePresentationComponent,
    children: [{ path: '', component: ProfileMainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePresentationModule {}
