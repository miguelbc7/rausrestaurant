import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HorarioService } from '../../../services/horario.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import * as moment from "moment"; 

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  name;
  start;
  end;
  start2;
  end2;
  status = false;
  list:any;
  errorMessage: any;
  title = 'Agregar';
  id;
  disabled = true;

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
      status: this.status,
      schedules: [],
    }

    if(this.start && this.end)
    {
      item.schedules.push({
        start:  this.start,
        end:  this.end,
      });
    }
    if(this.start2 && this.end2)
    {
      item.schedules.push({
        start: this.start2,
        end:  this.end2
      });
    }
    console.log(item);
    console.log(this.title);
    if(this.title == 'Agregar')
    {
      this.horarioService.createItem(item).then(res =>{
        res.subscribe(() =>{
          this.modalCtrl.dismiss();
          this.errorMessage = '';
          this.router.navigate(['home']);
        },
        error=>{
          console.log(error);
          this.errorMessage = error.error;
        })
      }).catch(err => console.error(err));
    } else if(this.title == 'Editar')
    { 
      this.horarioService.updateItem(item).then(res =>{
        res.subscribe(() =>{
          this.modalCtrl.dismiss();
          this.errorMessage = '';
          this.router.navigate(['home']);
        },
        error=>{
          console.log(error);
          this.errorMessage = error.error;
        })
      }).catch(err => console.error(err));
    }
  }


  async getHorario(){
   await this.horarioService.getItem(this.name).then(res=>{
      res.subscribe(data =>{
        console.log(data);
        if(data.schedules){
          this.title = 'Editar';
          let schedules = data.schedules.schedules;
          this.status = data.schedules.status;
          this.start = schedules[0].start;
          this.end = schedules[0].end;
          this.start2 = schedules[1].start;
          this.end2 = schedules[1].end;
          // this.id - data.id;
        }else{
          this.title = "Agregar"
        }
        console.log(this.title);
      })
    });
  }

  // remove(id)
  // {
  //   this.horarioService.deleteItem(id);
  // }

  // edit(value){
  //   this.start = value.start;
  //   this.end = value.end;
  //   this.id = value.id;
  //   this.title = 'Editar';
  // }

  statusItem()
  {
    console.log(this.status);

    let data = {
      status: this.status,
      name: this.name,
    }
    console.log(data);
    if(this.title == 'Editar'){
      this.horarioService.statusItem(data).then(res=>{
        res.subscribe(data =>{
          console.log(data);
        })
      },err =>{
        console.error(err);
      });;

    }
  }

  validar()
  {
    // new Date().toISOString();
      
      let start =  moment(this.start).format('HH:mm');
      let start2 =  moment(this.start2).format('HH:mm');
      let end =  moment(this.end).format('HH:mm');
      let end2 =  moment(this.end2).format('HH:mm');

      if(this.start && this.end && this.start2 && this.end2)
      {
        if(start < end && start2 >= start && start2 < end && start2 < end2)
        {
          this.disabled = true;
          console.log('ss');
        }
        else if(start < end && end2 > start && end2 <= end && start2 < end2)
        {
          this.disabled = true;
          console.log('ss2');
        }
        else if(start < end && start >= start2 && start < end2 && start2 < end2)
        {
          this.disabled = true;
          console.log('ss3');
        }
        else if(start < end && end > start2 && end <= end2 && start2 < end2)
        {
          this.disabled = true;
          console.log('ss4');
        }
        else if(start >= end || start2 >= end2)
        {
          this.disabled = true;
          console.log('ss5');
        }
        else
        {
          this.disabled = false;
          console.log('y');
        }

      }
      else if(this.start && this.end && this.start2)
      {
        this.disabled = true;
      }
      else if(this.start && this.end && this.end2)
      {
        this.disabled = true;
      }
      else if(this.start2 && this.end2 && this.start)
      {
        this.disabled = true;
      }
      else if(this.start2 && this.end2 && this.end)
      {
        this.disabled = true;
      }
      else if(this.start && this.end)
      {
        this.disabled = false;
        console.log('s');
      }
      else if(this.start2 && this.end2)
      {
        this.disabled = false;
        console.log('s2');
      }
  }

}
