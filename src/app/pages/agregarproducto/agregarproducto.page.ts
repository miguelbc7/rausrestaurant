import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ModalController, Platform, ActionSheetController, IonContent } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductocreadoPage } from '../modals/productocreado/productocreado.page';
import { ProductoguardadoPage } from '../modals/productoguardado/productoguardado.page';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
	selector: 'app-agregarproducto',
	templateUrl: './agregarproducto.page.html',
	styleUrls: ['./agregarproducto.page.scss'],
})

export class AgregarproductoPage implements OnInit {
	@ViewChild(IonContent, { static: false }) content: IonContent;
	hideMe=true;
	public productoForm: FormGroup;
	productos:any = [];
	aImages: any = [];
	aImages2: any = [];
	aImages3: any = [];
	idProm;
	sub;
	name;
	description;
	ingredientes:any = [];
	no_ingredientes:any = []; 
	nutritional_values:boolean = false;
	fat;
	carbohydrates;
	protein;
	total_calories;
	price_with_iva;
	decimals:any= {"entero":'0',"decimal":'00'};
	iva;
	eat_in_restaurant:boolean = false;
	wear:boolean = false;
	delivery:boolean = false;
	status:boolean = true;
	type;
	stock = 0;
	errorMessage = '';
	slideOptsOne = {
		initialSlide: 0,
		slidesPerView: 1
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
		private route: ActivatedRoute,
		private router: Router,
		private productosService: ProductosService, 
		private camera: Camera,
		private storage:Storage,
		public loading: LoadingService,
		private actionSheetController: ActionSheetController,
		private crop: Crop,
		private file: File
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
			ingredientes: [this.ingredientes, Validators.compose([])],
			no_ingredientes: [this.no_ingredientes, Validators.compose([])],
			nutritional_values: [this.nutritional_values],
			fat: [this.name, Validators.compose([])],
			carbohydrates: [this.carbohydrates, Validators.compose([])],
			protein: [this.protein, Validators.compose([])],
			total_calories: [this.total_calories, Validators.compose([])],
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
			stock: [this.stock, Validators.compose([
				Validators.required,
			])],
      	});
	}
	   
	ngOnInit() {}
	
    ionViewWillEnter(){
		/* this.sub = this.route.queryParams.subscribe(params => {
			this.type = +params['type'] || 'create';
		}); */

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
				this.aImages = [];

				this.productosService.getItem(res._id).then((data) =>{
					data.subscribe(res=>{
						console.log(res.product[0].images);
						if(res.product[0].images.length > 0){
							console.log('img', res.product[0].images);
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

	ngOnDestroy() {
		if(this.sub) {
			this.sub.unsubscribe();
		}
	}

	hide() {
  		this.hideMe = false;
	}

	show2() {
		this.hideMe = true;
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
				productID: this.productos._id ? this.productos._id : null,
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

	deleteSlider(index, img_id) {
		let id = this.productos._id;
		
		this.productosService.deleteImagen(id, img_id).then( response => {
			this.aImages.splice(index, 1);
		});
	}

	onSubmit(values) {
		this.loading.showLoader();
		let aIngredients;
		values.ingredients = [];

		if(values.ingredientes != '') {
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
		
		if(this.type == 'create') {
			this.productosService.createItem(values, this.aImages).then((response) => {
				response.subscribe( data => {
					this.productoCreado();
					this.idProm = data._id;
					this.productos = data;
					this.type = 'edit';
					this.ScrollToTop();
				}, err => {
					this.loading.hideLoader();this.loading.hideLoader();
				});
			});
		} else if(this.type == 'edit') {
			this.productosService.updateItem(this.productos._id, values, this.aImages3).then((response) => {
				response.subscribe( () => {
					this.productoGuardado();
					this.router.navigate(['home']);
				}, err => {
					this.loading.hideLoader();
				});
			}).catch( error => { 
				console.error(error);
			});
		}
	}

	uploadImage(id){
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
            }]
    	});
	
		await actionSheet.present();
  	}

	pickImage(sourceType) {
		const options: CameraOptions = {
			allowEdit: true,
			quality: 75,
			sourceType: sourceType,
			/* destinationType: this.camera.DestinationType.DATA_URL, */
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
		}

		this.camera.getPicture(options).then((imageData) => {
			this.cropImage(imageData).then( newImage => {
				this.imageToBase64(newImage.split('?')[0]).then( base64 => {
					let base64Image = 'data:image/jpeg;base64,' + base64;
					this.aImages.push({img : base64Image});
					this.aImages2.push({ img: imageData });
					this.aImages3.push({ img: imageData });
					console.log(this.aImages);
				});
			});
		}, err => {});
	}
	  
	async cropImage(imageData) {
		return new Promise<any>((resolve, reject) => {
			this.crop.crop(imageData, { quality: 100 }).then( newImage => { 
				console.log('new image path is: ' + newImage);
				resolve(newImage);
			}, error => { 
				console.error('Error cropping image', error);
				reject(error);
			});
		});
	}

	async imageToBase64(newImage) {
		return new Promise<any>((resolve, reject) => {
			var copyPath = newImage;
			var splitPath = copyPath.split('/');
			var imageName = splitPath[splitPath.length-1];
			var filePath = copyPath.split(imageName)[0];

			this.file.readAsDataURL(filePath,imageName).then (base64=>{
				console.log('base64 is: ' + base64);
				var base = base64.split(';base64,')[1];
				resolve(base);
			}, error=>{
				console.log('Error in showing image' + error);
				reject(error);
			});
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
		  	}
		}
	}

	ScrollToTop(){
		this.content.scrollToTop(0);
	}
}
