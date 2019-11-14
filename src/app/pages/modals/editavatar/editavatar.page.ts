import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editavatar',
  templateUrl: './editavatar.page.html',
  styleUrls: ['./editavatar.page.scss'],
})
export class EditavatarPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
