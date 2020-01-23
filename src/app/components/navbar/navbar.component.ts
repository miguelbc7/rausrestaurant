import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowcasePage } from '../../pages/showcase/showcase.page';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
		private modalCtrl: ModalController, 
  ) {}

  ngOnInit() {}

  notificaciones() {
  	this.router.navigate(['/notificaciones']);
  }

  chat() {
  	this.router.navigate(['/chat']);
  }

  async openTimeline() {
		this.router.navigate(['/cliente']);
		/* const modal = await this.modalCtrl.create({
		  component: ShowcasePage,
		  cssClass: 'sizeModalCierreModal',
		  backdropDismiss:false,
		});

		await modal.present(); */
	}

}
