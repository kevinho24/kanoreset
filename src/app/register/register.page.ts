import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { register } from 'swiper/element';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;

  formErrors = {
    name: [{ type: 'required', message: 'El nombre es obligatorio' }],
    lastname: [{ type: 'required', message: 'El apellido es obligatorio' }],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' },
    ],
    username: [{ type: 'required', message: 'El usuario es obligatorio' }],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8S caracteres' },
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Debes confirmar tu contraseña' },
      { type: 'mismatch', message: 'Las contraseñas no coinciden' },
    ],
  };

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        passwordConfirmation: new FormControl('', Validators.required),
      },
      { validators: this.matchPasswords }
    );
  }

  ngOnInit() {}


  registerUser(registerData: any) {
    console.log(registerData,'Datos de registro:');
  }

  private matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('passwordConfirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}

