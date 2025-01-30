import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
    ],
  };
  navCtrl: any;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private nathCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
      ])),
    });
  }

  ngOnInit() {
    this.loginForm.reset(); 
    this.errorMessage = ''; 
  }
  

  async loginUser(credentials: any) {
    try {
      const res: any = await this.authService.login(credentials); 
      console.log(res);
  
      await this.storage.set('user', res.user);
      await this.storage.set('isUserLoggedIn', true);
  
      const introShown = await this.storage.get('introShown'); 
  
      if (!introShown) {
        this.nathCtrl.navigateForward('/intro'); 
      } else {
        this.nathCtrl.navigateForward('/menu/home'); 
      }
  
      this.errorMessage = ''; 
    } catch (err) {
      console.log(err);
      this.errorMessage = err; 
    }
  }
  
}

  