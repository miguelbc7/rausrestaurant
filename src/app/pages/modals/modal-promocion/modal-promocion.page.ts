import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-promocion',
  templateUrl: './modal-promocion.page.html',
  styleUrls: ['./modal-promocion.page.scss'],
})
export class ModalPromocionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
