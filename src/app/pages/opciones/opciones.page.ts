import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  datas = [
    true,
    true,
    true,
    false,
    false
  ];

  constructor() { }

  changeIcon(index: string){
    this.datas[index] = !this.datas[index];
  }

  ngOnInit() {
  }

}
