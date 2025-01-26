import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPostModalPage } from './add-post-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddPostModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPostModalPageRoutingModule {}
