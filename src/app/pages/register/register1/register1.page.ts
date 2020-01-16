import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ModalController, ToastController, Platform} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { MyLocation, Geocoder, GoogleMap, GoogleMaps, GeocoderResult, LocationService } from '@ionic-native/google-maps';

@Component({
  	selector: 'app-register1',
  	templateUrl: './register1.page.html',
  	styleUrls: ['./register1.page.scss'],
  	encapsulation: ViewEncapsulation.None
})

export class Register1Page implements OnInit {
	public register1: FormGroup;
  	map: GoogleMap;
  	form: FormGroup;
  	pass:any;
  	cpass:any;
  	passwordType: string = "password";
  	passwordShown: boolean = false;
  	passwordType2: string = "password";
  	passwordShown2: boolean = false;
  	data: { username: any; password: any; };
  	categories;
  	errorMessage:string = "";
  	keyboardHide = "";
  	tempCat;
  	address;
	direction;
	validation_messages = {
		'business_name': [
			{ type: 'required', message: 'Debe ingresar un nombre comercial.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'name': [
			{ type: 'required', message: 'Debe ingresar un razon social.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'cif_nic': [
			{ type: 'required', message: 'Debe ingresar un cif/nic.' },
			{ type: 'maxlength', message: 'Debe ser menor de 20 caracteres.' }
		],
		'address': [
			{ type: 'required', message: 'Debe ingresar una dirección.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
		],
		'name_responsable': [
			{ type: 'required', message: 'Debe ingresar un nombre de responsable en el establecimineto.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
		],
		'phone': [
			{ type: 'required', message: 'Debe ingresar un Teléfono.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
		],
		'email': [
			{ type: 'required', message: 'Debe ingresar un Correo electrónico.' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' },
			{ type: 'pattern', message: 'Debe ingresar un formato valido.' },
		],
		'password': [
			{ type: 'required', message: 'Contraseña Requerida' },
			{ type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
			{ type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial(@!%*?&#.$-_).' }
		],
		'repeat_password': [
			{ type: 'required', message: 'Contraseña Requerida' },
			{ type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
			{ type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial(@!%*?&#.$-_).' }
		],
		'tags': [
			{ type: 'required', message: 'Debe ingresar una actividad de tu empresa.' },
		],
	}

  	constructor(
    	private modalCtrl: ModalController,
    	public formBuilder: FormBuilder,
    	private router: Router,
    	private authService: AuthService,
    	private storage: Storage,
    	private toastCtrl: ToastController,
    	private androidPermissions: AndroidPermissions,
    	private locationAccuracy: LocationAccuracy,
    	readonly ngZone: NgZone,
    	private platform: Platform,
    	private location: Location,
    	private keyboard: Keyboard,
    ) {

		this.register1 = formBuilder.group({
			business_name: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(300),
				Validators.minLength(5)
			])],
			name: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(300),
				Validators.minLength(5),
				Validators.pattern('[A-Za-zñÑ ]{5,300}'),
			])],
			cif_nic: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(20)
			])],
			name_responsable: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(150),
				Validators.minLength(5)
			])],
			address: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(300),
				Validators.minLength(5)
			])],
			phone: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(20)
			])],
			email: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(30),
				Validators.minLength(5),
				Validators.pattern('[A-Za-z0-9._%+-ñÑ]{2,}@[a-zA-Z-_.ñÑ]{2,}[.]{1}[a-zA-ZñÑ]{2,}'),
			])],
			tags: ['', Validators.compose([
				// Validators.required,
			])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(15),
				Validators.minLength(8),
				Validators.pattern('(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])(?=.*[$@$!%*?&#.$($)-_])[A-Za-zñÑ\d$@$!%*?&#.$($)-_].{7,15}')
			])],
			repeat_password: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(15),
				Validators.minLength(8),
				Validators.pattern('(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])(?=.*[$@$!%*?&#.$($)-_])[A-Za-zñÑ\d$@$!%*?&#.$($)-_].{7,15}')
			])],
		});
  	}

  	async onSubmit(values){
		await this.storage.set('user', values);

		values.direction = {
			street: values.address,
			lat: this.direction.position?this.direction.position.lat.toString():'40.000001',
			lng: this.direction.position?this.direction.position.lng.toString(): '-49.12311122211',
			zipcode: this.direction.postalCode?this.direction.postalCode:'33150',
			city: this.direction.locality?this.direction.locality:'barcelona',
			state: this.direction.adminArea?this.direction.adminArea:'barcelona',
			country: this.direction.country?this.direction.country:'España',
		};
		
		this.authService.registerUser(values).subscribe( async res => {
			this.storage.set('_uid', res.uid);
			this.errorMessage = "";
			
			await this.authService.loginUser({username: values.email, password: values.password}).then(resp => {
				this.errorMessage = "";
				this.authService.getToken(resp.user.uid).subscribe(token =>{
				this.storage.set('_token', token);
				this.router.navigate(["/welcome"]);
				});
			}, err => {
				console.error(err);
			});
		}, err => {
			if(err.error.error) {
				this.errorMessage = err.error.error;
			} else {
				this.errorMessage = 'Hubo un problema durante el registro, por favor intente más tarde';
			}
		});
  	}

	ionViewWillEnter(){
		this.ngOnInit();
	}

	async ngOnInit() {
		this.checkGPSPermission();

		this.platform.backButton.subscribeWithPriority(1, () => {
			this.router.navigate(["/login"]);
		});
		
		await this.storage.get('direction').then( data => {
			if(data) {
				data.extra.lines.pop();
				this.direction = data;
				this.address = data.street;
			} else {
				this.myLocation();
			}
		});
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

	onKeydown(event) {
		if(this.pass != this.cpass) {
			console.log('not equal');
		} else {
			console.log('equal')
		}
	}

	public togglePassword() {
		if(this.passwordShown) {
			this.passwordShown = false;
			this.passwordType = "password";
		} else {
			this.passwordShown = true;
			this.passwordType = "text";
		}
	}

	public revelarConfirmacion() {
		if(this.passwordShown2) {
			this.passwordShown2 = false;
			this.passwordType2 = "password";
		} else {
			this.passwordShown2 = true;
			this.passwordType2 = "text";
		}
	}

	getMap() {
		localStorage.setItem('url','register');
		this.router.navigate(['map']);
	}

	myLocation(){
		LocationService.getMyLocation().then((myLocation: MyLocation) => {
			this.geocoderMap(myLocation.latLng);
		});
	}

	geocoderMap(latlng){
		let options = {
			position: latlng
		};

		Geocoder.geocode(options).then( (results: GeocoderResult[])=>{
			this.direction = results[0];
			this.direction.extra.lines.pop();
			this.address = this.direction.extra.lines.join(', ');
			console.log('address2', this.address);
		}).catch(error =>{
			console.error(error);
			this.showToast(error.error_message);
		})
	}

	async showToast(message: string) {
		let toast = await this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'middle'
		});

		toast.present();
	}

	checkGPSPermission() {
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
			result => {
				if (result.hasPermission) {

				} else {
					this.requestGPSPermission();
				}
			}, err => {
				console.error(err);
			}
		);
	}

	requestGPSPermission() {
		this.locationAccuracy.canRequest().then((canRequest: boolean) => {
			if (canRequest) {
				console.log("4");
			} else {
				this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
					.then(
					() => {
						this.askToTurnOnGPS();
					},
					error => {
						console.error('requestPermission Error requesting location permissions 1' + error)
					}
				);
			}
		});
	}

	askToTurnOnGPS() {
		this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
			() => {
				this.myLocation()
			},
			error => console.error('Error requesting location permissions 2' + JSON.stringify(error))
		);
	}

}