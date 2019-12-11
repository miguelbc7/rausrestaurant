import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalEditavatarPage } from '../modals/modal-editavatar/modal-editavatar.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingService } from 'src/app/services/loading.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ProductoguardadoPage } from '../modals/productoguardado/productoguardado.page';

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
  passwordType: string  = 'password';
  passwordShown: any;
  avatar = 'assets/img/avatar.png';
  type = 'create';
  idAvatar;
  aImages: any = [{image: 'assets/img/avatar.png'}];

  constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private storage: Storage, private nativeGeocoder: NativeGeocoder, public loading: LoadingService,private camera: Camera, private actionSheetController: ActionSheetController ) { 

      this.profileForm = this.formBuilder.group({
          business_name: ['', Validators.compose([
            Validators.required,
            Validators.maxLength(300),
            Validators.minLength(5)
          ])],
          // direction: ['', Validators.compose([
          //   Validators.required,
          //   Validators.maxLength(300),
          //   Validators.minLength(5)
          // ])],
          phone: ['', Validators.compose([
            Validators.required,
            Validators.maxLength(20)
          ])],
          email: ['', Validators.compose([
            // Validators.required,
            Validators.maxLength(30),
            // Validators.minLength(5),
            Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}'),
          ])],
          password: ['', Validators.compose([
            // Validators.required,
            // Validators.maxLength(15),
            // Validators.minLength(8),
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{7,15}')
          ])],
      });

    }

 ionViewWillEnter(){
  this.loading.showLoader();
    this.ngOnInit();
   }

  
  ngOnInit() {
    this.getMe();
   this.getUserDetail();
   this.getAvatar();
  }
  validation_messages = {
    'business_name': [
        { type: 'required', message: 'Debe ingresar un nombre comercial.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      // 'direction': [
      //   { type: 'required', message: 'Debe ingresar una dirección.' },
      //   { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
      // ],
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
    console.log(this.avatar);
    this.storage.set('imgPreview', this.avatar);
    const modal = await this.modalCtrl.create({
      component: ModalEditavatarPage,
      componentProps:[
       { type: this.type,
        id: this.idAvatar}
      ]
    });

    modal.onDidDismiss().then((data) => {
      const user = data['data']; // Here's your selected user!
      this.avatar = data['data'];
    });

    await modal.present();
 }

 getUserDetail(){
  this.authService.getProfile().then(res=>{
    res.subscribe(data =>{
      console.log(data);
      // this.nativeGeocoder.reverseGeocode(data.direction.lat,data.direction.lon)
      //     .then(
      //       (result: NativeGeocoderResult[]) => {
      //       this.address = result[0];
      //       console.log(JSON.stringify( result[0] ) )
      //       })
      //     .catch((error: any) => console.log(error));
      this.profile = data;
      // this.profile.address = data.direction.street;
      // console.log(this.profile.direction.street);
      this.loading.hideLoader();
    })
  });
 }
 
 getMe(){
   console.log('me');
   this.authService.me().then(res =>{
    res.subscribe(data =>{
      console.log(data);
      this.email = data.user.email;

      // console.log(this.email);
    })
  });
 }

  getAvatar(){
    this.authService.getAvatar().then(response => {
      if(response){
        this.avatar = response.image;
        this.type ='edit';
      }
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
 public togglePassword() {
  if(this.passwordShown){
    this.passwordShown = false;
    this.passwordType = 'password';
  }else {
    this.passwordShown = true;
    this.passwordType = 'text';
  }
}

async selectImage() {
  const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
              text: 'Cargar imagen',
              handler: () => {
                  this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
          },
          {
              text: 'Tomar foto',
              handler: () => {
                  this.pickImage(this.camera.PictureSourceType.CAMERA);
              }
          },
          {
              text: 'Cancelar',
              role: 'cancel'
          }
      ]
  });
  await actionSheet.present();
}

pickImage(sourceType) {
   
  const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.aImages = {image:base64Image} ;
    this.avatar = base64Image;
    console.log(this.type);
    if(this.type == 'create'){
      this.authService.createAvatar(this.aImages).then(() => {
        // this.storage.set('avatar',data);
        this.getAvatar();
        this.guardado();
        
     });
    }else{
      this.authService.updateAvatar(this.aImages).then((response) => {
        this.getAvatar();
        this.guardado();
     });
    }
  
  }, (err) => {
    // Handle error
  });
}

async guardado(){
  const modal = await this.modalCtrl.create({
    component: ProductoguardadoPage,
    cssClass: 'sizeModalProductoCreado'
    });
      await modal.present();
}

}
