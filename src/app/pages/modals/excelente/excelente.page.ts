import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-excelente',
  templateUrl: './excelente.page.html',
  styleUrls: ['./excelente.page.scss'],
})
export class ExcelentePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async gotohome() {
    await this.modalCtrl.dismiss();
  }
}
