import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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

  ngOnInit() {}

  loginUser(credentials: any) {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', credentials);
      
    } else {
      console.error('Formulario inválido');
    }
  }
  
}

