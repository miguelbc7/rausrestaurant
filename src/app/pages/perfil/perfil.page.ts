import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditavatarPage } from '../modals/modal-editavatar/modal-editavatar.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public profileForm: FormGroup;
  errorMessage = '';
  profile:any ={};
  address:any = 'Carrer de Aribau 655. 08021. Barcelona';
  email;

  constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private storage: Storage, private nativeGeocoder: NativeGeocoder, ) { 

      this.profileForm = this.formBuilder.group({
        business_name: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        address: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        phone: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])],
        email: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(5),
          Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}'),
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,15}')
        ])],
    });

    }

 ionViewWillEnter(){
    this.ngOnInit();
   }

  
  ngOnInit() {
    this.getUserDetail();
    this.getMe();
  }
  validation_messages = {
    'business_name': [
        { type: 'required', message: 'Debe ingresar un nombre comercial.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      'address': [
        { type: 'required', message: 'Debe ingresar una dirección.' },
      ],
      'phone': [
        { type: 'required', message: 'Debe ingresar un Teléfono.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'email': [
        { type: 'required', message: 'Debe ingresar un Correo electrónico.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'password': [
        { type: 'required', message: 'Contraseña Requerida' },
        { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
        { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
        { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
      ],
      // 'categories': [
      //   { type: 'required', message: 'Debe ingresar por lo menos una actividad de tu empresa.' },
      // ],
    }


  async editperfil() {
    const modal = await this.modalCtrl.create({
      component: ModalEditavatarPage,
    });
    await modal.present();
 }

 getUserDetail(){
  this.authService.getProfile().then(res=>{
    res.subscribe(data =>{

      this.nativeGeocoder.reverseGeocode(data.address.lat,data.address.lon)
          .then(
            (result: NativeGeocoderResult[]) => {
            this.address = result[0];
            // console.log(JSON.stringify( result[0] ) )
            })
          .catch((error: any) => console.log(error));
      data.address = this.address;
      this.profile = data;
      console.log(this.profile);
    })
  });
 }
 
 getMe(){
   this.authService.me().then(res =>{
    res.subscribe(data =>{
      this.email = data.user.email;

      // console.log(this.email);
    })
  });
 }

 onSubmit(values){
   console.log(values);
  this.authService.updateProfile(values).then(res=>{
    console.log(res);
    res.subscribe(data =>{
      console.log(data);
      this.router.navigate(["/home"]);
    },err=>{
      console.error(err);

    })
  }).catch(error =>{
    console.error(error);
  })
 }

}
