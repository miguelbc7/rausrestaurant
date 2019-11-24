import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  public productoForm: FormGroup;

  productos: any = [];
  aImages: any = [];

  constructor(
    private modalCtrl: ModalController, 
    public formBuilder: FormBuilder, 
    private router: Router,
    private productosService: ProductosService, 
    private camera: Camera,
    private file: File,
    private plt: Platform,
    private filePath:FilePath,
    private storage:Storage,
    private webview: WebView,
    private ref: ChangeDetectorRef,
    ) {
    this.productoForm = formBuilder.group({
        name: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        description: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(10)
        ])],
        ingredientes: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        no_ingredientes: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        nutritional_values: [true],
        fat: ['', Validators.compose([
          Validators.required,
        ])],
        carbohydrates: ['', Validators.compose([
          Validators.required,
        ])],
        protein: ['', Validators.compose([
          Validators.required,
        ])],
        total_calories: ['', Validators.compose([
          Validators.required,
        ])],
        price_with_iva: ['10', Validators.compose([
          // Validators.required,
        ])],
        iva: ['', Validators.compose([
          // Validators.required,
        ])],
        eat_in_restaurant: [true],
        wear: [true],
        delivery: [true],
        status: [true],
        // images: [],
        // stock: ['', Validators.compose([
        //   Validators.required,
        // ])],
    });


   }

   errorMessage: string = '';

  validation_messages = {
      'name': [
        { type: 'required', message: 'Debe ingresar el nombre del producto.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      'description': [
        { type: 'required', message: 'Debe ingresar una descripción.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      'ingredientes': [
        { type: 'required', message: 'Debe ingresar los ingredientes.' },
        { type: 'minlength', message: 'Debe ser menor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      'no_ingredientes': [
        { type: 'required', message: 'Debe ingresar los alergenos.' },
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
        // { type: 'required', message: 'Debe ingresar el precio con iva.' },
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
    }
  ngOnInit() {
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1
    // autoplay:true
   };

   async presentPromocion() {
    const modal = await this.modalCtrl.create({
      component: ModalPromocionPage,
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

  async addslider() {
    const modal = await this.modalCtrl.create({
      component: AddsliderPage,
    });
    await modal.present();
 }

 onSubmit(values)
 {
   let aIngredients = values.ingredientes.split(',');
   let aNoIngredients = values.no_ingredientes.split(',');
   values.ingredients = aIngredients;
   values.no_ingredients = aNoIngredients;
   console.log(values);
   this.productosService.createItem(values).then((response) => {
     response.subscribe((data) => {
       console.log(data);
      //  this.productos = data.products;
       this.presentPromocion();
       this.router.navigate(['home']);
   }, err => {
    console.log(err);
  });
   
    // this.router.navigate(['list']);
  });
 }

 // Imagen 

  pickImage() {
    const options: CameraOptions = {
      quality: 20,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.aImages.push(base64Image) ;
      console.log(this.aImages);
   
    }, (err) => {
      // Handle error
    });
  }

}
