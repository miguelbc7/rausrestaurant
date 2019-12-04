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

  avatar = 'assets/img/avatar.png';

  constructor(private modalCtrl: ModalController, private camera: Camera,private authService:AuthService ) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  buscar(){
    
  }

}
