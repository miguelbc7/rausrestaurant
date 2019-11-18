import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-addproduct',
  templateUrl: './modal-addproduct.page.html',
  styleUrls: ['./modal-addproduct.page.scss'],
})
export class ModalAddproductPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
