import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HorarioService } from '../../../services/horario.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  name;
  start:'12:00';
  end:'';
  status = false;
  list:any;
  errorMessage: any;

  constructor(private modalCtrl: ModalController, private horarioService: HorarioService, private router:Router) { 
    this.name = `${name}`;
  }

  ngOnInit() {
    this.getHorario();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  createForm(){
    let item = {
      name: this.name,
      schedules: {
        end: this.end,
        start: this.start,
        status: this.status,
      },
    }
    console.log(item);
    this.horarioService.createItem(item).then(res =>{
      res.subscribe(data =>{
        console.log(data);
        this.getHorario();
        this.modalCtrl.dismiss();
        this.errorMessage = '';
        this.router.navigate(['home']);
      },
      error=>{
        console.log(error);
        this.errorMessage = error.error;
      })
    });
  }


  async getHorario(){
   await this.horarioService.getItem(this.name).then(res=>{
      res.subscribe(data =>{
        console.log(data);
        console.log(data.schedules);
        this.list = data.schedules.schedules;
      })
    });
  }

  remove(id)
  {

  }

}
