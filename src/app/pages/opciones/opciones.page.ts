import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  datas = [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  constructor() { }

  changeIcon(index: string){
    if(this.datas[index] == false){
      this.datas[index] = !this.datas[index];
      for(var i=0;i<this.datas.length;i++){
        if(parseInt(index) != i ){
          this.datas[i] = !this.datas[index];
          }
      }
    }

  }

  ngOnInit() {
  }

}
