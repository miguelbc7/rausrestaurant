import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { AuthService } from 'src/app/services/auth.service';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-modal-editavatar',
  templateUrl: './modal-editavatar.page.html',
  styleUrls: ['./modal-editavatar.page.scss'],
})
export class ModalEditavatarPage implements OnInit {

  public value:any = 'assets/img/avatar.png';
  aImages: any = [{image: 'assets/img/avatar.png'}];
  avatar = 'assets/img/avatar.png';
  image;
  public type = this.navParams.get('type');
  public idAvatar = this.navParams.get('idAvatar');
  uid;

  images = [];

  constructor(private modalCtrl: ModalController, private storage: Storage,private camera: Camera,private authService: AuthService, public platform: Platform, public navParams: NavParams,
    ) { }

  ngOnInit() {
    this.storage.get('avatar').then(res =>{
      console.log(res);
      if(res)
        this.avatar = res;
      console.log(this.avatar);
    });
    this.storage.get('uid').then(res =>{
      console.log(res);
      if(res)
        this.uid = res;
    });

    console.log(this.avatar);
    console.log(this.aImages[0].image);

  }

  async closeModal() {
    await this.modalCtrl.dismiss(this.avatar);
  }

 pickImage(type) {
   
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
      this.aImages = {image:base64Image} ;
      this.avatar = base64Image;
      if(type == 'create'){
        this.authService.createAvatar(this.aImages).then((response) => {
          response.subscribe((data) => {
            console.log(data);
            this.storage.set('avatar',data);
            this.getAvatar();
        }, err => {
            console.error(err);
          });
       });
      }else{
        this.authService.updateAvatar(this.aImages).then((response) => {
          this.getAvatar();
       });
      }
    
    }, (err) => {
      // Handle error
    });
  }

  getAvatar(){
    this.authService.getAvatar().then(response => {
      console.log('response', response);
      this.avatar = response.image;
    });
  }

}
