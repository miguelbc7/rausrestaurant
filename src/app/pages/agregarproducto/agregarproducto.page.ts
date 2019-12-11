import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, Platform, ActionSheetController } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductocreadoPage } from '../modals/productocreado/productocreado.page';
import { ProductoguardadoPage } from '../modals/productoguardado/productoguardado.page';

@Component({
	selector: 'app-agregarproducto',
	templateUrl: './agregarproducto.page.html',
	styleUrls: ['./agregarproducto.page.scss'],
})

export class AgregarproductoPage implements OnInit {

	public productoForm: FormGroup;

	productos:any = [];
	aImages: any = [];
	name;
	description;
	ingredientes:any = [];
	// dingredientes:any = [];
	no_ingredientes:any = []; 
	// dno_ingredientes:any = [];
	nutritional_values:boolean = false;
	fat;
	carbohydrates;
	protein;
	total_calories;
	price_with_iva;
	iva;
	eat_in_restaurant:boolean = false;
	wear:boolean = false;
	delivery:boolean = false;
	status:boolean = false;
	type;
	stock = 0;
	errorMessage = '';
	slideOptsOne = {
		initialSlide: 0,
		slidesPerView: 1
		// autoplay:true
	};

	profile:any = {};
	validation_messages = {
		'name': [
			{ type: 'required', message: 'Debe ingresar el nombre del producto.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'description': [
			{ type: 'required', message: 'Debe ingresar una descripción.' },
			{ type: 'minlength', message: 'Debe ser mayor de 15 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'ingredientes': [
			{ type: 'required', message: 'Debe ingresar al menos un ingrediente.' },
			{ type: 'minlength', message: 'Debe ser menor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'no_ingredientes': [
			{ type: 'required', message: 'Debe ingresar al menos un alergeno.' },
			{ type: 'minlength', message: 'Debe ser menor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'nutritional_values': [
		],
		'fat': [
			{ type: 'required', message: 'Debe ingresar la cantidad de grasas.' },
		],
		'carbohydrates': [
			{ type: 'required', message: 'Debe ingresar la cantidad de carbohidrato.' },
		],
		'protein': [
			{ type: 'required', message: 'Debe ingresar la cantidad de proteína' },
		],
		'total_calories': [
			{ type: 'required', message: 'Debe ingresar la cantidad total dde calorías' },
		],
		'price_with_iva': [
			{ type: 'required', message: 'Debe ingresar el precio con iva.' },
		],
		'iva': [
			{ type: 'required', message: 'Debe seleccionar el iva.' },
		],
		'eat_in_restaurant': [
		],
		'wear': [
		],
		'delivery': [
		],
		'stock':[
			
		]
	}

  	constructor(
		private modalCtrl: ModalController, 
		public formBuilder: FormBuilder, 
		private router: Router,
		private productosService: ProductosService, 
		private camera: Camera,
		private storage:Storage,
		public loading: LoadingService,
		private actionSheetController: ActionSheetController,
    ) {
        this.productoForm = this.formBuilder.group({
        	name: [this.name , Validators.compose([
				Validators.required,
				Validators.maxLength(300),
				Validators.minLength(5)
          	])],
			description: [this.description, Validators.compose([
				Validators.required,
				Validators.maxLength(300),
				Validators.minLength(15)
			])],
			ingredientes: [this.ingredientes, Validators.compose([
				// Validators.required,
				// Validators.maxLength(300),
				// Validators.minLength(5)
			])],
			no_ingredientes: [this.no_ingredientes, Validators.compose([
				// Validators.required,
				// Validators.maxLength(300),
				// Validators.minLength(5)
			])],
			nutritional_values: [this.nutritional_values],
			fat: [this.name, Validators.compose([
				// Validators.required,
			])],
			carbohydrates: [this.carbohydrates, Validators.compose([
				// Validators.required,
			])],
			protein: [this.protein, Validators.compose([
				// Validators.required,
			])],
			total_calories: [this.total_calories, Validators.compose([
				// Validators.required,
			])],
			price_with_iva: [this.price_with_iva, Validators.compose([
				Validators.required,
			])],
			iva: [this.iva, Validators.compose([
				Validators.required,
			])],
			eat_in_restaurant: [this.eat_in_restaurant],
			wear: [this.wear],
			delivery: [this.delivery],
			status: [this.status],
			// images: [],
			stock: [this.stock, Validators.compose([
				Validators.required,
			])],
      	});
   	}
	
    ionViewWillEnter(){
		this.storage.get('typeProduct').then(res =>{
			 this.type = res;
			 console.log(this.type);
		   if(res == 'create'){
			   this.storage.remove('product');
		   }
	   });
	   
		this.storage.get('profile').then(res =>{
		   this.profile = res;
	   });
	
		this.storage.get('product').then(res =>{
		   console.log(res);
		   
		   if(res){
			   this.productos = res;
			   this.ingredientes = [];
			   if(res.ingredients.length > 0){
				   res.ingredients.forEach(key => {
					   console.log(key);
				   this.ingredientes.push(key.name);
				   });
			   }
			   this.no_ingredientes = [];
			   if(res.no_ingredients.length > 0){
				   res.no_ingredients.forEach(key => {
				   this.no_ingredientes.push(key.name);
				   });
			   }
			   this.name = res.name;
			   this.description = res.description;
			   this.ingredientes = this.ingredientes.toString();
			   this.no_ingredientes = this.no_ingredientes.toString();
			   this.nutritional_values = res.nutritional_values;
			   this.carbohydrates = res.carbohydrates;
			   this.fat = res.fat;
			   this.protein = res.protein;
			   this.total_calories = res.total_calories;
			   this.price_with_iva = res.price_with_iva;
			   this.iva = res.iva;
			   this.eat_in_restaurant = res.eat_in_restaurant;
			   this.wear = res.wear;
			   this.delivery = res.delivery;
			   this.status = res.status;
			   // if(res.images.length >0){
			   // 	res.images.forEach(key => {
			   // 		this.aImages.push(key.img);
			   // 	});
			   // }
			   this.aImages = [];
			   this.productosService.getItem(res._id).then((data) =>{
				   data.subscribe(res=>{
					   console.log(res.product[0].images);
					   if(res.product[0].images.length > 0){
						   console.log('img');
						   res.product[0].images.forEach(key=>{
							   console.log(key);
							   this.aImages.push(key);
						   })
					   }
				   })
			   }).catch(error => console.error(error));
		   }
		 });
	}
	
  	ngOnInit() {
	  }
	  
	async productoCreado() {
  		const modal = await this.modalCtrl.create({
    	component: ProductocreadoPage,
    	cssClass: 'sizeModalProductoCreado'
  	});
  		await modal.present();
	}

	back(){
		this.storage.remove('product');
		this.router.navigate(['home']);
	}

	async presentPromocion() {
		const modal = await this.modalCtrl.create({
		component: ModalPromocionPage,
		componentProps:{
			productID: this.productos._id?this.productos._id:null,
		},
		cssClass: 'sizeModalPromocion'
		});

		await modal.present();
	}
	
	async addprom() {
		await this.modalCtrl.dismiss();
		const modal = await this.modalCtrl.create({
		component: ExcelentePage,
		cssClass: 'sizeModalPromocion'
		});
		await modal.present();
	}

	deleteSlider(index) {
		console.log(index);
		this.aImages.splice(index, 1);
	}

	onSubmit(values) {
		this.loading.showLoader();
		let aIngredients;
		values.ingredients = [];
		if(values.ingredientes != ''){
			console.log(values.ingredientes);
			aIngredients = values.ingredientes.split(',');
			for (let index = 0; index < aIngredients.length; index++) {
				values.ingredients.push ({ 'name' : aIngredients[index] } ) ;
			}

		}
		
		let aNoIngredients;
		values.no_ingredients = [];
		if(values.no_ingredientes != ''){
			aNoIngredients = values.no_ingredientes.split(',');
			for (let index = 0; index < aNoIngredients.length; index++) {
				console.log(aNoIngredients[index]);
				values.no_ingredients.push( { 'name' : aNoIngredients[index]} ) ;
			}
			

		}
		let float = this.price_with_iva.split('.').join('');
		let number = float.split(',').join('.');
		values.price_with_iva = number;
		values.fat = values.fat?values.fat:0;
		values.carbohydrates = values.carbohydrates?values.carbohydrates:0;
		values.total_calories = values.total_calories?values.total_calories:0;
		values.protein = values.protein?values.protein:0;
		// console.log(aIngredients);
		console.log('values', values);
		console.log('type', this.type);
		console.log(this.productos);
		
		if(this.type == 'create') {
			console.log('type', this.type);
			this.productosService.createItem(values).then((response) => {
			response.subscribe( (data) => {
				if(this.aImages.length > 0)
					this.uploadImage(data._id);
				this.productoCreado();
				this.router.navigate(['home']);
			}, err => {
			console.log(err);
			this.loading.hideLoader();this.loading.hideLoader();
			});
			
			// this.router.navigate(['list']);
			});
		} else if(this.type == 'edit') {
			console.log(this.type);
			this.productosService.updateItem(this.productos._id,values).then((response) => {
				response.subscribe( () => {
				if(this.aImages.length > 0)
					this.uploadImage(this.productos._id);
				this.productoGuardado();
				this.router.navigate(['home']);
			}, err => {
			console.log(err);
			this.loading.hideLoader();
			});
			
			// this.router.navigate(['list']);
			}).catch(error=>{console.error(error)});
		}
		
	}

	uploadImage(id){
		console.log('uploadimage');

		this.storage.set('tempImagesProduct', { id: id, images : this.aImages });
		
		this.productosService.uploadItem(id, this.aImages).then((response) => {
			response.subscribe(async (data) => {
			//  this.productos = data.products;
			console.log('uploadimage data');
			console.log(data);
			// await this.presentPromocion(id);
			this.loading.hideLoader();
			
			await this.router.navigate(['home']);
			
		}, err => {
			console.error(err.error.error);
			this.errorMessage  = err.error.error;
			this.loading.hideLoader();
			});
		}).catch(error => console.error(error));
	}

	async productoGuardado(){
		const modal = await this.modalCtrl.create({
			component: ProductoguardadoPage,
			cssClass: 'sizeModalProductoCreado'
		  });
			  await modal.present();
	}

 //////////////////// Imagen //////////////////////

 async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Cargar imagen',
                handler: () => {
                    this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Tomar foto',
                handler: () => {
                    this.pickImage(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancelar',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

	pickImage(sourceType) {
		const options: CameraOptions = {
			quality: 75,
			sourceType: sourceType,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
		}
		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.aImages.push({img : base64Image}) ;
			console.log(this.aImages);
		}, (err) => {
			// Handle error
		});
  	}

	add(){
		if(!this.stock)
			this.stock = 0;
		if(this.stock>= 0)
			this.stock= this.stock+1;
	}

	remove(){
		if(!this.stock)
			this.stock = 0;
		if(this.stock > 0)
			this.stock=this.stock- 1;
	}

	decimal(event){
		if(this.price_with_iva.length == 0){
		  if(event.key == '0') {
			event.preventDefault();
			// this.value = '0,00';
		  }
		  // else{
		  //   this.value = '0,0'+this.value;
		  // }
		}
		// else if(this.value.length > 4){
		  
		//   console.log(this.value);
		// }
		
	  }
}
