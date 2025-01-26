import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostModalPageRoutingModule } from './add-post-modal-routing.module';

import { AddPostModalPage } from './add-post-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPostModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPostModalPage]
})
export class AddPostModalPageModule {}
