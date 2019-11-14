import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { TagsHelper } from '../../helpers/tags-helper';
// import { MustMatch } from '../../validators/must-match.validator';
import { AuthService } from '../../../services/auth.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-register1',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
})
export class Register1Page implements OnInit {

  public register1: FormGroup;
  form: FormGroup;
  pass;
  cpass;
  passwordType: string = "password";
  passwordShown: boolean = false;
  passwordType2: string = "password";
  passwordShown2: boolean = false;

  constructor( public formBuilder: FormBuilder, private router: Router,private authService: AuthService,private nativeGeocoder: NativeGeocoder,) {

    this.register1 = this.formBuilder.group({
      code: [],
      tags: [[]],
    });

    this.register1 = formBuilder.group({
      business_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      cif_nic: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      name_responsable: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      // code: ['', Validators.compose([
      //   Validators.required,
      // ])],
      categories: ['', Validators.compose([
        // Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,15}')
      ])],
      repeat_password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,15}')
      ])],
  });
  }

  errorMessage: string = '';

  validation_messages = {
    'business_name': [
        { type: 'required', message: 'Debe ingresar un nombre comercial.' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'name': [
        { type: 'required', message: 'Debe ingresar un razon social.' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'cif_nic': [
        { type: 'required', message: 'Debe ingresar un cif/nic.' },
        { type: 'maxlength', message: 'Debe ser menor de 20 caracteres.' }
      ],
    }

  onSubmit(values){
    this.nativeGeocoder.forwardGeocode(values.address)
    .then((
      result: NativeGeocoderResult[]
      ) => {
        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
        
        values.push('lat' , result[0].latitude);
        values.push('lng' , result[0].longitude);
        
      }
      )
      .catch((error: any) => console.log(error));
    
    this.authService.registerUser(values)
    .subscribe(res => {
      this.errorMessage = "";
      console.log(res);
      // this.router.navigate(["/home"]);
    },err => {
      this.errorMessage = "error registro";
      console.log(err);
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