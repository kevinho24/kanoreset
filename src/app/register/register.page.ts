import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  
  formErrors = {
    name: [{ type: 'required', message: 'El nombre es obligatorio' }],
    last_name: [{ type: 'required', message: 'El apellido es obligatorio' }],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' },
    ],
    username: [{ type: 'required', message: 'El usuario es obligatorio' }],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Debes confirmar tu contraseña' },
      { type: 'mismatch', message: 'Las contraseñas no coinciden' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        passwordConfirmation: new FormControl('', Validators.required),
      },
      { validators: this.matchPasswords } 
    );
  }

  ngOnInit() {}

  
  private matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  
  registerUser(registerData: any) {
    if (this.registerForm.valid) {
      this.authService
        .register(registerData)
        .then((res) => {
          console.log(res);
          this.errorMessage = '';
          this.navCtrl.navigateForward('/login'); 
        })
        .catch((err) => {
          console.error(err);
          this.errorMessage = 'Error al registrarse. Por favor, intente nuevamente.';
        });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}


