import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';
@Component({
  selector: 'app-welcome1',
  templateUrl: './welcome1.page.html',
  styleUrls: ['./welcome1.page.scss'],
})
export class Welcome1Page implements OnInit {
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  constructor(
    private router: Router
    
  ) { }
  ngOnInit() {
  }

  ionViewDidEnter(){
    setTimeout(()=>{
      this.slides.slideNext();
    },1750)
    setTimeout(()=>{
      this.router.navigate(['login'])
    },3500)
    
  }

}
