import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editavatar',
  templateUrl: './editavatar.page.html',
  styleUrls: ['./editavatar.page.scss'],
})
export class EditavatarPage implements OnInit {

  avatar = 'assets/img/rest1.jpg';

  constructor(private modalCtrl: ModalController, private camera: Camera,private authService:AuthService ) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  buscar(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.avatar = base64Image ;
      this.authService.updateAvatar(this.avatar);
      this.modalCtrl.dismiss();
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

}
