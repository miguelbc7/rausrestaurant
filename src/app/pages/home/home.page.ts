import { Component, OnInit, NgZone } from '@angular/core';
import { HorariosPage } from '../modals/horarios/horarios.page';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { EditavatarPage } from '../modals/editavatar/editavatar.page';
import { ModalAddproductPage } from '../modals/modal-addproduct/modal-addproduct.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { EditdireccionPage } from '../modals/editdireccion/editdireccion.page';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductosService } from '../../services/productos.service';
import { HorarioService } from 'src/app/services/horario.service';
import { SliderHomeService } from 'src/app/services/slider-home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
	productos:any;
	token:any;
	horarios: any = [];
	lunes:any = [];
	martes:any = [];
	miercoles:any = [];
	jueves:any = [];
	viernes:any = [];
	sabado:any = [];
	domingo:any = [];
	slider: any;
	aImages:any = [];
	ingredientes;
	profile:any = {
		business_name: '',
		direction: '',
	};
	slideOptsOne = {
		initialSlide: 0,
		slidesPerView: 1
	};
	avatar = 'assets/img/avatar.png';

	constructor(
		private modalCtrl: ModalController, 
		public productosService: ProductosService, 
		private storage: Storage, 
		private sliderService: SliderHomeService, 
		private horarioService:HorarioService,
		private authService: AuthService,
		private camera: Camera,
		public loading: LoadingService,
		private actionSheetController: ActionSheetController,
		readonly ngZone: NgZone,
		public router:Router
	) {
		this.productos = [];
		this.storage.get('_token').then(val =>{
			this.token = val.token;
		});
	}

	ionViewWillEnter() {
		this.getProfile();
		this.getSlider();
		this.getListHorario();
		this.getListProductos();
		/* this.getAvatar(); */
	}

	ngOnInit() {}

	goToOpcion() {
		this.router.navigate(['/opciones']);
	}

	getProfile() {
		this.authService.getProfile().then( res => { res.subscribe( data => {
				this.profile.business_name = data.business_name;
				this.profile.direction = data.direction;
				this.storage.set('profile',data);
				this.avatar = data.photo;
			});
		});
	}

	async selectImage() {
		const actionSheet = await this.actionSheetController.create({
			header: "Select Image source",
			buttons: [
				{
					text: 'Cargar imagen',
					handler: () => {
						this.addslider(this.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},
				{
					text: 'Tomar foto',
					handler: () => {
						this.addslider(this.camera.PictureSourceType.CAMERA);
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

	addslider(sourceType) {
		const options: CameraOptions = {
			quality: 100,
			sourceType: sourceType,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
		}

		this.camera.getPicture(options).then( imageData => {
			let base64Image = 'data:image/jpeg;base64,' + imageData;

			/* this.aImages.push({ image: base64Image }); */
			this.sliderService.create_NewItem(base64Image).then( response => { 
				/* this.aImages.push({ image: response[0].photo });
				this.slider.push({ image: response[0].photo }); */
				this.getSlider();
				console.log('images', this.aImages);
			});
		}, (err) => {
			console.error(err);
		}).catch( error => { 
			console.error(error);
		});
	}

	async openHorarios(dia, data) {
		const modal = await this.modalCtrl.create({
			component: HorariosPage,
			cssClass: 'sizeModalHorario',
			componentProps: {
				name: dia,
				schedules: data,
			}
		});

		modal.onDidDismiss().then( dataReturned => {
			if (dataReturned !== null) {
				this.getListHorario();
			}
		});

		await modal.present();
	}

	async addpromocion(productID) {
		const modal = await this.modalCtrl.create({
			component: ModalPromocionPage,
			componentProps:{
				productID:productID,
			},
			cssClass: 'sizeModalPromocion',
			backdropDismiss:false,
		});

		await modal.present();
	}

	async editAvatar() {
		const modal = await this.modalCtrl.create({
			component: EditavatarPage,
			cssClass: 'sizeModalAvatar'
		});

		await modal.present();
	}

	async editdireccion() {
		const modal = await this.modalCtrl.create({
			component: EditdireccionPage,
			cssClass: 'sizeModalDireccion'
		});
		
		await modal.present();
	}
	
	getListProductos() {
		this.loading.present(6000);

		this.productosService.getList().then(response => {
			console.log('response', response);
			response.subscribe((data) => {
				console.log('data', data);
				this.productos = data.products;
				let tempImagesProduct:any = this.storage.get('tempImagesProduct');

				for (let index = 0; index < this.productos.length; index++) {
					if(tempImagesProduct.id == this.productos[index]._id)
					{
						this.productos[index].tempImages = tempImagesProduct.images;
						this.storage.remove('tempImagesProduct');
					}
				}
				this.loading.hideLoader();
			}, error => {
				console.log(error);
			});
		});
	}

	getListHorario() {
		this.lunes = [];
		this.martes = [];
		this.miercoles = [];
		this.jueves = [];
		this.viernes = [];
		this.sabado = [];
		this.domingo = [];

		this.horarioService.getList().then(response => {
			response.subscribe((data) => {
				console.log('data', data);
				if(data.schedules.schedules) {
					for(let index = 0 ; index < data.schedules.schedules.length; index++) {
						switch(data.schedules.schedules[index].name) {
							case('Lunes'):
								this.lunes.push(data.schedules.schedules[index]);
								break;
							case('Martes'):
								this.martes.push(data.schedules.schedules[index]);
								break;
							case('Miercoles'):
								this.miercoles.push(data.schedules.schedules[index]);
								break;
							case('Jueves'):
								this.jueves.push(data.schedules.schedules[index]);
								break;
							case('Viernes'):
								this.viernes.push(data.schedules.schedules[index]);
								break;
							case('Sabado'):
								this.sabado.push(data.schedules.schedules[index]);
								break;
							case('Domingo'):
								this.domingo.push(data.schedules.schedules[index]);
								break;
						}
					}
				}
			}, err => {
				console.log(err);
			});
		});
	}
	
	editProduct(product) {
		delete product.images;
		this.storage.set('typeProduct', 'edit');

		this.storage.set('product', product).then(()=>{
			this.router.navigate(['/agregarproducto'], { queryParams: { type: 'edit', product: product } });
		}).catch(error => console.error(error));
	}

	addProduct() {
		this.storage.remove('product');
		this.storage.set('typeProduct', 'create');
		this.router.navigate(['/agregarproducto'], { queryParams: { type: 'create' } });
	}

	getSlider() {
		this.sliderService.read_Items().then(response => {
			console.log('getSlider', response);
			this.slider = response;
			this.aImages = [];
			/* response.then( data => {
				if(data){
					this.slider = data;
					this.aImages = [];
				}
			}, err => {
				console.log(err);
			}); */
		}).catch(err => console.error(err));
	}

	getAvatar() {
		this.authService.getAvatar().then(response => {
		
			if(response)
				this.avatar = response.image;
		});
	}

	deleteSlider(id, url) {
		this.sliderService.delete_Item(id, url).then( response => {
			console.log('response', response);
			this.aImages = response.slider;
			this.slider = response.slider;
		});
	}

	deleteTempSlider(index) {
		this.aImages.splice(index, 1);
	}

	getMap() {
		localStorage.setItem('url','home');
		localStorage.setItem('street',this.profile.direction.street);
		this.router.navigate(['map']);
	}

	isEmptyObject(obj) {
		return (obj && (Object.keys(obj).length === 0));
	}

	ngOnDestroy(){}
	
}


