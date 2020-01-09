import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SaldoService } from 'src/app/services/saldo.service';
import { AuthService } from 'src/app/services/auth.service';
import { SearchPage } from '../modals/search/search.page';
import { ShowcaseService } from '../../services/showcase.service';
import { Router } from '@angular/router';

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
	business_name;
  	fontSize = 'font60';
	mask = '000';
	promotions;
	restaurants;

	slideOpts = {
		slidesPerView: 2,
	};

  	constructor(
		private modalCtrl: ModalController,
		private saldoService:SaldoService,
		private showcaseService: ShowcaseService,
		private authService: AuthService,
    	private platform: Platform,
    	private router: Router
	) {}

	ngOnInit() {

		this.platform.backButton.subscribeWithPriority(1, () => {
			this.router.navigate(["/home"]);
		});

		this.saldoService.read_Items().then(data => {
			data.subscribe(e => {
				this.data = e;
				let valor = 0;

				for(let i = 0; i<this.data.length; i++) {
					valor = Number(valor) + Number(this.data[i].payload.doc.data().value);    
				}
				
				this.value = valor;
				this.decimal = this.value.toFixed(2).toString().split('.'); 
				
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

		this.getProfile();
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
				console.log('data', data.product);
				var array = [];
				data.product.forEach( row => {
					var price = row.price_with_iva + "";
					if(price.indexOf('.') > -1) {
						var price1: any = price.split('.')[0];
						var price2: any = price.split('.')[1];
					} else {
						var price1: any = row.price_with_iva;
						var price2: any = '00';
					}

					var a = { ingredients: row.ingredients, no_ingredients: row.no_ingredients, images: row.images, _id: row._id, name: row.name, description: row.description, nutritional_values: row.nutritional_values, fat: row.fat, carbohydrates: row.carbohydrates, protein: row.protein, total_calories: row.total_calories, iva: row.iva, eat_in_restaurant: row.eat_in_restaurant, wear: row.wear, delivery: row.delivery, status: row.status, stock: row.stock, id_restaurant: row.id_restaurant, id_promotion: row.id_promotion, __v: row.__v, price1: price1, price2: price2 }
					array.push(a);
				});
				this.promotions = array;
			});
		});
	}

	async getRestaurants() {
		this.showcaseService.getRestaurants().then( response => {
			response.subscribe( data => {
				var res = [];

				for(let i of Object.keys(data)) {
					var slider;

					if(data[i].slider) {
						slider = data[i].slider[0].photo
					} else {
						slider = "";
					}

					var a = { name: data[i].name, slider: slider};
					res.push(a);
				}
				
				this.restaurants = res;
			});
		});
	}

	getProfile(){
    	this.authService.getProfile().then( res =>{
      		res.subscribe(data =>{
        		this.business_name = data.business_name;
        		this.avatar = data.photo;
      		})
    	});
  	}
}
