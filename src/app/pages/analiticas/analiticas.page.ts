import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.page.html',
  styleUrls: ['./analiticas.page.scss'],
})
export class AnaliticasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  redireccionar() {
    console.log("click");
  }

}
