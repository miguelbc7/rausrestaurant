import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-modal-editavatar',
  templateUrl: './modal-editavatar.page.html',
  styleUrls: ['./modal-editavatar.page.scss'],
})
export class ModalEditavatarPage implements OnInit {

  public value:any = 'assets/img/avatar.png';
  aImages: any = [];
  avatar;

  constructor(private modalCtrl: ModalController, private storage: Storage,private camera: Camera,private authService: AuthService, public platform: Platform ) { }

  ngOnInit() {
    this.storage.get('imgPreview').then(res =>{
      this.avatar = res;
      console.log(this.avatar);
    })
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

 pickImage() {
   
    let destinationType = this.camera.DestinationType.FILE_URI;
    if(this.platform.is('ios')){
      destinationType = this.camera.DestinationType.NATIVE_URI;
    }
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: destinationType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData.subString(23);
      this.avatar = imageData;
      this.authService.updateAvatar(imageData);
    }, (err) => {
      // Handle error
    });
  }
}
