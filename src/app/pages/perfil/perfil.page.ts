import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalEditavatarPage } from '../modals/modal-editavatar/modal-editavatar.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingService } from 'src/app/services/loading.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ProductoguardadoPage } from '../modals/productoguardado/productoguardado.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

	public profileForm: FormGroup;
	errorMessage = '';
	profile:any ={};
	address:any = 'Carrer de Aribau 655. 08021. Barcelona';
	email;
	passwordType: string  = 'password';
	passwordShown: any;
	avatar = 'assets/img/avatar.png';
	type = 'create';
	idAvatar;
	aImages: any = [{image: 'assets/img/avatar.png'}];
	validation_messages = {
		'business_name': [
			{ type: 'required', message: 'Debe ingresar un nombre comercial.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'phone': [
			{ type: 'required', message: 'Debe ingresar un Teléfono.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
		],
		'email': [
			{ type: 'required', message: 'Debe ingresar un Correo electrónico.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
		],
		'password': [
			{ type: 'required', message: 'Contraseña Requerida' },
			{ type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
			{ type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
		],
	}

  	constructor(
		private modalCtrl: ModalController,
		public formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private storage: Storage,
		private nativeGeocoder: NativeGeocoder,
		public loading: LoadingService,
		private camera: Camera,
		private actionSheetController: ActionSheetController,
		private crop: Crop
	) { 
      	this.profileForm = this.formBuilder.group({
			business_name: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(300),
				Validators.minLength(5)
			])],
			phone: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(20)
			])],
			email: ['', Validators.compose([
				Validators.maxLength(30),
				Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}'),
			])],
			password: ['', Validators.compose([
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{7,15}')
			])],
		});
    }

	ionViewWillEnter(){
		this.loading.showLoader();
		this.ngOnInit();
	}

  
	ngOnInit() {
		this.getMe();
		this.getUserDetail();
	}

	async editperfil() {
		this.storage.set('imgPreview', this.avatar);

		const modal = await this.modalCtrl.create({
			component: ModalEditavatarPage,
			componentProps:[
			{ type: this.type,
				id: this.idAvatar}
			]
		});

		modal.onDidDismiss().then((data) => {
			const user = data['data'];
			this.avatar = data['data'];
		});

		await modal.present();
	}

	getUserDetail(){
		this.authService.getProfile().then(res=>{
			res.subscribe( data => {
				this.profile = data;
				this.avatar = data.photo;
				this.loading.hideLoader();
			})
		});
	}
 
	getMe(){
		this.authService.me().then( res => {
			res.subscribe(data =>{
				this.email = data.user.email;
			})
		});
	}

	getAvatar(){
		this.authService.getAvatar().then(response => {
			if(response) {
				this.avatar = response.image;
				this.type ='edit';
			}
		});
	}

	onSubmit(values) {
		this.authService.updateProfile(values).then( res => {
			console.log(res);
			res.subscribe(data =>{
			console.log(data);
			this.router.navigate(["/home"]);
			},err=>{
			console.error(err);

			})
		}).catch(error =>{
			console.error(error);
		});
	}

	public togglePassword() {
		if(this.passwordShown) {
			this.passwordShown = false;
			this.passwordType = 'password';
		} else {
			this.passwordShown = true;
			this.passwordType = 'text';
		}
	}

	async selectImage() {
		const actionSheet = await this.actionSheetController.create({
			header: "Select Image source",
			buttons: 
			[
				{
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
			allowEdit: true,
			quality: 100,
			sourceType: sourceType,
			/* destinationType: this.camera.DestinationType.DATA_URL, */
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
		}

		this.camera.getPicture(options).then( imageData => {
			/* let base64Image = 'data:image/jpeg;base64,' + imageData; */
			/* this.aImages = { image: base64Image } ; */
			/* this.avatar = base64Image; */

			this.crop.crop(imageData, { quality: 100 }).then( newImage => { 
				console.log('new image path is: ' + newImage);
			}, error => { 
				console.error('Error cropping image', error);
			});

			/* this.authService.updateAvatar(this.aImages).then((response) => {
				this.guardado();
			}); */
		}, err => {
			console.log('error', err)
		});
	}

	async guardado(){
		const modal = await this.modalCtrl.create({
			component: ProductoguardadoPage,
			cssClass: 'sizeModalProductoCreado'
		});
		
		await modal.present();
	}
}
