import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  datas = [
    {status: true, name: 'Cierre día', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Agregar', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Historial', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Recompensas', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Analíticas', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Perfil', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Config', icono: 'assets/img/icon/campa2.svg'},
    {status: false, name: 'Salir', icono: 'assets/img/icon/campa2.svg'},
    // {status: false, name: ''}
  ];

  constructor() { }

  changeIcon(index: string){
    if(this.datas[index].status == false){
      this.datas[index].status = !this.datas[index].status;
      for(var i=0;i<this.datas.length;i++){
        if(parseInt(index) != i ){
          this.datas[i].status = !this.datas[index].status;
          }
      }
    }

    switch(index){
      case(0):
        //posicion 1 abrir modal del cierre
        console.log('cierre');
        break;
      case(1):
        //posicion 2 url
        console.log('agregar');
        break;
    }

  }

  ngOnInit() {
  }

}
