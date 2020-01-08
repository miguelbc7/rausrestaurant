import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SaldoService } from 'src/app/services/saldo.service';
import { SearchPage } from '../modals/search/search.page';
import { ShowcaseService } from '../../services/showcase.service';

@Component({
	selector: 'app-cliente',
	templateUrl: './cliente.page.html',
	styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {

   	value:any = 0.00;
  	decimal = this.value.toFixed(2).toString().split('.'); 
  	data;
  	profile:any = {
    	business_name: '',
    	direction: '',
  	};
	avatar = 'assets/img/avatar.png';
  	fontSize = 'font60';
	mask = '000';
	promotions;
	restaurants;

  	constructor(
		private modalCtrl: ModalController,
		private saldoService:SaldoService,
		private showcaseService: ShowcaseService,
	) {}

	// Slider Promotions 

	slideOpts = {
		slidesPerView: 2,
	  };

	ngOnInit() {
		console.log('a');

		this.saldoService.read_Items().then(data => {
			data.subscribe(e => {
				this.data = e;
				let valor = 0;

				for(let i = 0; i<this.data.length; i++) {
					valor = Number(valor) + Number(this.data[i].payload.doc.data().value);    
				}
				
				this.value = valor;
				this.decimal = this.value.toFixed(2).toString().split('.'); 
				console.log(this.decimal[0]);
				
				if(this.decimal[0].length >= 5){
					this.fontSize = 'font27';
					this.mask = '00.000';

					if(this.decimal[0].length == 6) {
						this.mask = '000.000';
					}
					else if(this.decimal[0].length == 7) {
						this.mask = '0.000.000';
					} else if(this.decimal[0].length == 8) {
						this.mask = '00.000.000';
					}
				} else if(this.decimal[0].length >= 3) {
					this.fontSize = 'font40';

					if(this.decimal[0].length == 4) {
						this.mask = '0.000'
					}
				}
			})
		});

		this.getPromotions();
		this.getRestaurants();
	}
	
	async openSearch() {
    	const modal = await this.modalCtrl.create({
      		component: SearchPage,
      		cssClass: 'sizeModalSearch',
      		backdropDismiss:false,
      		showBackdrop:true,
    	});

    	await modal.present();
	}
	
  	async getPromotions() {
		this.showcaseService.getPromotions().then( response => {
			response.subscribe( data => {
				console.log('promotions', data);
				this.promotions = data.product;
			});
		});
	}

	async getRestaurants() {
		this.showcaseService.getRestaurants().then( response => {
			response.subscribe( data => {
				console.log('restaurants', data);
				var res = [];

				for(let i of Object.keys(data)) {
					var slider;

					if(data[i].slider) {
						/* data[i].slider.forEach( (row, j) => {
							if(j == 0) {
							}
						}); */
						slider = data[i].slider[0].photo
					} else {
						slider = "";
					}

					var a = { name: data[i].name, slider: slider};
					res.push(a);
				}
				
				console.log('restaurants2', res);
				this.restaurants = res;
			});
		});
	}
}
