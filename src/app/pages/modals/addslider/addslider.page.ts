import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-addslider',
  templateUrl: './addslider.page.html',
  styleUrls: ['./addslider.page.scss'],
})
export class AddsliderPage implements OnInit {

  public value:any ;
  aImages: any = [];

  constructor(private modalCtrl: ModalController,  private navParams: NavParams, private storage: Storage,private camera: Camera, ) { }

  ngOnInit() {
    this.storage.get('imgPreview').then(res =>{
      this.value = res;
      console.log(this.value);
    })
  }

  async buscarfoto() {
    // const modal = await this.modalCtrl.create({
    //   component: BuscarfotoPage,
    // });
    // await modal.present();
    console.log(this.value);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

 
  pickImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData.subString(23);
      this.aImages.push({img : base64Image}) ;
      console.log(this.aImages);
      
    }, (err) => {
      // Handle error
    });
  }


}
