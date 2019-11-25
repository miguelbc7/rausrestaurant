import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  name;

  public data = [{
    start:'',
    end:'',
    status: false,
  }];

  list:any;

  constructor(private modalCtrl: ModalController, private horarioService: HorarioService) { 
    this.name = `${name}`;
  }

  ngOnInit() {
    this.getHorario();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  createForm(){
    console.log(this.data);
    let item = {
      name: this.name,
      schedules: this.data,
    }
    console.log(item);
    this.horarioService.createItem(item).then(res =>{
      res.subscribe(data =>{
        console.log(data);
        this.getHorario();
        // this.modalCtrl.dismiss();
      },
      error=>{
        console.log(error);
      })
    });
  }

  getHorario(){
    this.horarioService.getItem(this.name).then(res=>{
      res.subscribe(data =>{
        this.list = data.schedule;
      })
    });
  }

}
