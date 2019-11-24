import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { TagsHelper } from '../../helpers/tags-helper';
// import { MustMatch } from '../../validators/must-match.validator';
import { AuthService } from '../../../services/auth.service';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register1',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
})
export class Register1Page implements OnInit {
  
  public register1: FormGroup;
  form: FormGroup;
  pass:any;
  cpass:any;
  passwordType: string = "password";
  passwordShown: boolean = false;
  passwordType2: string = "password";
  passwordShown2: boolean = false;
  data: { username: any; password: any; };
  tags:[{ nombre: "#hoteleria"},{ nombre: "#restaurante"} ];


  constructor( public formBuilder: FormBuilder, private router: Router,private authService: AuthService,private nativeGeocoder: NativeGeocoder, private storage: Storage) {

    this.register1 = formBuilder.group({
      business_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(300),
        Validators.minLength(5)
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(300),
        Validators.minLength(5)
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
        Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}'),
      ])],
      // code: ['', Validators.compose([
      //   Validators.required,
      // ])],
      categories: ['', Validators.compose([
        // Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,15}')
      ])],
      repeat_password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,15}')
      ])],
  });
  }

  errorMessage: string = '';

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
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'password': [
        { type: 'required', message: 'Contraseña Requerida' },
        { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
        { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
        { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
      ],
      'repeat_password': [
        { type: 'required', message: 'Contraseña Requerida' },
        { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
        { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
        { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula y un número.' }
      ],
      // 'categories': [
      //   { type: 'required', message: 'Debe ingresar por lo menos una actividad de tu empresa.' },
      // ],
    }

  async onSubmit(values){
   await this.storage.set('user', values);
    values.lat = -4.0000000;
    values.lng = 40.0000000;
    this.nativeGeocoder.forwardGeocode(values.address)
    .then((
      result: NativeGeocoderResult[]
      ) => {
        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
        
        values.lat = result[0].latitude;
        values.lng = result[0].longitude;
        
      }
      )
      .catch((error: any) => console.log(error));
      
    delete values.address;
    console.log(values);
    this.authService.registerUser(values)
    .subscribe(res => {
      this.errorMessage = "";
      // this.data.username = values.email;
      // this.data.password = values.password;
      // this.authService.loginUser(this.data);
      this.router.navigate(["/welcome"]);

    },err => {
      this.errorMessage = "Hubo un error durante el proceso del registro, por favor intente de nuevo.";
      // console.log(err.msg);
    })
    // this.router.navigate(["/welcome"]);
  }

  ngOnInit() {
  }

  // upload(form) {
  //   console.log(register1.tags);
  //   register1.tags = this.tagArrayToString(register1.tags);
  //   console.log(register1.tags);
  // }

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
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = "password";
    }else {
      this.passwordShown = true;
      this.passwordType = "text";
    }
  }

  public revelarConfirmacion() {
    if(this.passwordShown2){
      this.passwordShown2 = false;
      this.passwordType2 = "password";
    }else {
      this.passwordShown2 = true;
      this.passwordType2 = "text";
    }
  }

}