import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { AddDatePage } from '../modals/add-date/add-date.page';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
const cities = require('cities.json');

@Component({
	selector: 'app-programation',
	templateUrl: './programation.page.html',
	styleUrls: ['./programation.page.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ProgramationPage implements OnInit {

	topics = [];
  	name: string;
	talks = [];
	token;
	programation;
	categories;
	category;
	citiesarr;
	promotion;
	pricepercategory;
	idpromotion;
	iva;
	baseprice;
	priceperday;
	pricepercity;
	pricecity1;
	pricecity2;
	subtotal;
	priceday;
	pricecity;
	pricecategory: any = 0;
	total;
	days: any[] = [];
	inputcategories
	catStatus = false;
	base_path = environment.url;
	preparedTags = [
    	'#Ionic',
    	'#Angular',
    	'#Javascript',
    	'#Mobile',
    	'#Hybrid',
    	'#CrossPlatform'
	];
	slideOpts = {
    	slidesPerView: 4
	};
	public programation1: FormGroup;
	@Input() title: any;
	@Input() subtitle: any;
	@Input() slider: any;
	@Input() rows: any;
	  
	constructor(
    	private modalCtrl: ModalController, 
		private storage: Storage,
		public formBuilder: FormBuilder,
		public router: Router,
		private http: HttpClient
	) {
		this.programation1 = formBuilder.group({
			cit: ['', Validators.compose([
				Validators.required,
			])],
			cat: ['', Validators.compose([
				Validators.required
			])]
		});
	}

	ngOnInit() {
		this.getProgramation();
		this.getCategories();

		var arr = [];

		cities.forEach( row => {
			arr.push(row.name);
		});

		this.citiesarr = arr;

		console.log('title', this.title);
	}

 	async modalDate() {
		const modal = await this.modalCtrl.create({
			component: AddDatePage,
			componentProps:{},
			cssClass: 'ModalDate',
			backdropDismiss:false,
		});
		
		modal.onDidDismiss().then((data: any) => {
			var array = this.days;
			array.push(data.data);
			this.days = array;
		});

		await modal.present();
  	}

  	tagArrayToString(tagArray: string[]): string {
    	if (Array.isArray(tagArray) && tagArray.length > 0) {
      		const tags = tagArray.map((e: any) => `[${e.value}]`);
      		const tagString = tags.join();
      		return tagString;
    	} else {
      		return '';
    	}
  	}
  
  	addTalk() {
    	this.talks.push({name: this.name, topics: this.topics});
	}
	  
	async getProgramation() {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			var uid = res;

			return this.http.get(this.base_path + 'programacion', {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => {
					var pricecity = res['pricepercity'] + "";

					if(pricecity.indexOf('.') > -1) {
						this.pricecity1 = res['pricepercity'].split('.')[0];
						this.pricecity2 = res['pricepercity'].split('.')[1];
					} else {
						this.pricecity1 = res['pricepercity'];
						this.pricecity2 = '00';
					}

					this.promotion = res['promotion'];
					this.pricepercategory = res['pricepercategory'];
					this.pricepercategory = res['pricepercategory'];
					this.idpromotion = res['_id'];
					this.iva = res['iva'];
					this.baseprice = res['baseprice'];
					this.priceperday = res['priceperday'];
					this.pricepercity = res['pricepercity'];
					this.priceday = res['priceperday'];
					this.pricecity = res['pricepercity'];
					this.subtotal = this.baseprice + this.priceday + this.pricecity + this.pricecategory;
					this.total = this.subtotal + this.iva;
				},
				err => { 
					console.log('err', err);
				}
			);
		});
	}

	async getCategories() {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			var uid = res;

			return this.http.get(this.base_path + 'categories', {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => {
					var array = [];

					res['categories'].forEach( row => {
						array.push(row.nombre);
					});
					this.categories = array;
				},
				err => { 
					console.log('err', err);
				}
			);
		});
	}

	async getCategory() {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			var uid = res;

			return this.http.get(this.base_path + 'programacion/category', {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => {
					this.category = res;
				},
				err => { 
					console.log('err', err);
				}
			);
		});
	}

	async pay() {
		var city = this.programation1.value.cit;
		var category = this.programation1.value.cat;
		console.log('cities', cities);
		var cities = [];
		var categories = [];

		city.forEach(row => {
			cities.push({ city: row.display, formatted_address: row.display });	
		});

		category.forEach( row => {
			categories.push({ category: row.display, price: 1, quantity: 1});
		});

		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			var uid = res;

			var data = {
				title: this.title,
				id_restaurant: uid,
				days: this.days,
				cities: cities,
				categories: categories,
				images: this.slider,
				items: this.rows
			};

			return this.http.post(this.base_path + 'showcase', JSON.stringify(data), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => {
					this.modalCtrl.dismiss();
					this.router.navigateByUrl('/opciones');
				}, error => {
					console.log('error', error);
				}
			)
		});
	}

	async back() {
    	await this.modalCtrl.dismiss();
		this.router.navigateByUrl('/opciones');
	}
}
