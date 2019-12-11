import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public loading: LoadingService, private platform: Platform) { }

  ngOnInit() {
    this.loading.hideLoader();
  }
  
  ionViewDidLeave(){
    this.platform.backButton.observers.pop();
  }


}
