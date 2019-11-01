import { Component, OnInit } from '@angular/core';
import { HorariosPage } from '../modals/horarios/horarios.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async openHorarios() {
    const modal = await this.modalCtrl.create({
      component: HorariosPage,
    });
  
    await modal.present();
  }

}


