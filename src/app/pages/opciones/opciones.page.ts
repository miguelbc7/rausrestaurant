import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarPage } from '../modals/agregar/agregar.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  datas = [
    {
      status: false,
      name: 'Cierre día',
      icono: 'assets/img/icon/campa2.svg'
    },
    {
      status: false,
      name: 'Agregar',
      icono: 'assets/img/icon/campa2.svg'
    },
    {
      status: false,
      name: 'Historial',
      icono: 'assets/img/icon/campa2.svg'
      },
    {
      status: false,
      name: 'Recompensas',
      icono: 'assets/img/icon/campa2.svg'
    },
    {
      status: false,
      name: 'Analíticas',
      icono: 'assets/img/icon/campa2.svg'
    },
    {
      status: false,
      name: 'Perfil',
      icono: 'assets/img/icon/campa2.svg'
      },
    {
      status: false,
      name: 'Config',
      icono: 'assets/img/icon/campa2.svg'
    },
    {
      status: false,
      name: 'Salir',
      icono: 'assets/img/icon/campa2.svg'
    },
  ];

  constructor(private modalCtrl: ModalController, private router: Router,) { }

  changeIcon(index: number){
    if(this.datas[index].status == false){
      this.datas[index].status = !this.datas[index].status;
      for(var i=0;i<this.datas.length;i++){
        if(index != i ){
          this.datas[i].status = !this.datas[index].status;
          }
      }
    }

    switch(index){
      case (0):

        break;

      case (1):
        this.presentPoliticas();
        break;

      case (2):
        this.router.navigate(['/historial']);
        break;
        
      case (3):
        
        break;
        
      case (4):
          this.router.navigate(['/analiticas']);
        break;
        
      case (5):
          this.router.navigate(['/perfil']);
        break;
        
      case (6):
          this.router.navigate(['/configuracion']);
        break;
        
      case (7):
          this.router.navigate(['/login']);
        break;
    }

  }

  ngOnInit() {
  }

  async presentPoliticas() {
    const modal = await this.modalCtrl.create({
      component: AgregarPage,
    });

    await modal.present();
  }

}
