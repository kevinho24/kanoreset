import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false,
})
export class AddPostModalPage implements OnInit {
  post_image: any;
  addPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController,
    public alertController: AlertController
  ) {
    this.addPostForm = this.formBuilder.group({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      image: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async uploadPhone() {
    await this.presentPhotoOptions(); 
  }

  async addPost(post_data: any) {
    console.log('Add Post');
    console.log(post_data);
    const user = await this.storage.get('user');
    const post_param = {
      description: post_data.description,
      image: post_data.image,
      user_id: user.id,
    };

    console.log(post_param, 'post para enviar');

    this.postService.createPost(post_param).then(
      (data: any) => {
        console.log(data, 'post creado');
        data.user = {
          id: user.id,
          name: user.name,
          image: user.image || 'assets/images/default-avatar.jpeg'
        };
        this.postService.postCreated.emit(data);
        this.addPostForm.reset();
        this.post_image = null;
        this.modalController.dismiss();
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  async takePhoto(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: source,
    });

    if (image && image.dataUrl) {
      this.post_image = image.dataUrl;
      this.addPostForm.patchValue({
        image: this.post_image,
      });
    }
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccionar una opción",
      message: "¿De dónde quieres obtener la imagen?",
      buttons: [
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera); 
          },
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos); 
          },
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelado");
          },
        },
      ],
    });
    await alert.present();
  }

  async dismissModal() {
    await this.modalController.dismiss(); 
  }
}
