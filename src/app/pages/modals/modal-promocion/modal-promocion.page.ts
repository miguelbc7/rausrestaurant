import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExcelentePage } from '../excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PromocionService } from '../../../services/promocion.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
	selector: 'app-modal-promocion',
	templateUrl: './modal-promocion.page.html',
	styleUrls: ['./modal-promocion.page.scss'],
})

export class ModalPromocionPage implements OnInit {

	name:any = 1;
	promotions: any[];
	@Input() productID: any;

	constructor(
    	private modalCtrl: ModalController,
		public formBuilder: FormBuilder,
		private router: Router,
		private promocionService: PromocionService,
		private storage: Storage,
    ) {}

  	ngOnInit() {
		this.getPromotions();
	}
  
	async closeModal() {
    	await this.modalCtrl.dismiss();
  	}
  
	async addprom() {
    	await this.modalCtrl.dismiss();
		
		const modal = await this.modalCtrl.create({
      		component: ExcelentePage,
      		cssClass: 'sizeModalPromocion',
      		backdropDismiss:false,
    	});
		
		await modal.present();
	}
	 
	async getPromotions() {
		this.promocionService.getList().then( response => {
			response.subscribe( data => {
				console.log('data', data);
				this.promotions = data.datas;
			});
		});
	} 

 	radioVal(value){
  		this.name = value;
  		console.log(value);
	 }
	 
	promote() {
		if(this.name) {
			var promotion;

			this.promotions.forEach( row => {
				if(row._id == this.name) {
					promotion = row;
				}
			});

			console.log('promotion', promotion);

			this.promocionService.createPromote(promotion, this.productID).then( response => {
				response.subscribe( data => {
					console.log('promote', data);
					this.closeModal();
					this.router.navigate(['home']);
				});
			});
		}
		
		/* let promotion = this.promotions.map( e => { 
			if(e._id == this.name) {
				return e; 
			}
		}); */

	}

	createForm(){
  		let item = {
    		name: this.name,
  		}
		  
		this.promocionService.createItem(item).then(res =>{
    		res.subscribe(data =>{
				this.promocionService.productPromo(data._id).then(resp =>{
        			res.subscribe(dat =>{
						console.log(dat);
						this.closeModal();
						this.addprom();
        			});
      			});
    		}, error=>{
	      		console.log(error);
    		})
  		});
	}
}
