import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any;
  constructor(
    private postService: PostService,
    private modalController: ModalController,
  ) {}

  
  ngOnInit(){
    console.log('Home Page');
    this.postService.getPosts().then((data: any)=>{
      console.log(data);
      this.posts = data;
    })
  }

  async addPost(){
    console.log('Add Post');
    const modal = await this.modalController.create({ 
      component: AddPostModalPage,
      componentProps:{}
    });
    return await modal.present();
}
}
