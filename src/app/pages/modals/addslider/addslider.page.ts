import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BuscarfotoPage} from '../buscarfoto/buscarfoto.page';

@Component({
  selector: 'app-addslider',
  templateUrl: './addslider.page.html',
  styleUrls: ['./addslider.page.scss'],
})
export class AddsliderPage implements OnInit {

  public value = this.navParams.get('img');

  constructor(private modalCtrl: ModalController,  private navParams: NavParams,) { }

  ngOnInit() {
    console.log(this.value);
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

 

}
