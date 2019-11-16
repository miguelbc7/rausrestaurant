import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPoliticasPage } from '../modals/modal-politicas/modal-politicas.page';
import { ModalTerminosPage } from '../modals/modal-terminos/modal-terminos.page';
import { NewPasswordPage } from '../modals/new-password/new-password.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  errorMessage = '';
  passwordShown: any;
  passwordType: string  = 'password';

  constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder, private router: Router,
              private authService: AuthService, ) {
   }


  //  onSubmit(values){
  //   console.log(values);
  //   this.router.navigate(["/home"]);
  // }

  // tslint:disable-next-line: variable-name
  validation_messages = {
    username: [
        { type: 'required', message: 'Correo ó Teléfono requerido' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      password: [
            { type: 'required', message: 'Contraseña Rederida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            // { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
          ]
    }

  ngOnInit() {

      this.loginForm = this.formBuilder.group({
          username: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30)
          ]) ),
          password: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')

          ])),
      });

  }

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      this.errorMessage = "";
      this.router.navigate(["/home"]);
    },err => {
      this.errorMessage = 'Usuario invalido.';
      console.log(err);
    })
  }

  async presentPoliticas() {
    const modal = await this.modalCtrl.create({
      component: ModalPoliticasPage,
    });

    await modal.present();
  }

  async presentTerminos() {
    const modal = await this.modalCtrl.create({
      component: ModalTerminosPage,
    });

    await modal.present();
  }

  async newPassword() {
    const modal = await this.modalCtrl.create({
      component: NewPasswordPage,
      cssClass: 'sizeModal'
    });
    await modal.present();
  }

  public togglePassword() {
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

}
