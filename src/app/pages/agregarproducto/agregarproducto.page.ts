import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Storage } from '@ionic/storage';


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
  ingredientes;
  no_ingredientes;
  nutritional_values:boolean = true;
  fat;
  carbohydrates;
  protein;
  total_calories;
  price_with_iva;
  iva;
  eat_in_restaurant:boolean = true;
  wear:boolean = true;
  delivery:boolean = true;
  status:boolean = true;
  public type = this.navParams.get('type');

  constructor(
    private modalCtrl: ModalController, 
    public formBuilder: FormBuilder, 
    private router: Router,
    private productosService: ProductosService, 
    private camera: Camera,
    private storage:Storage,
    private navParams: NavParams,
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
            Validators.minLength(10)
          ])],
          ingredientes: [this.ingredientes, Validators.compose([
            Validators.required,
            Validators.maxLength(300),
            Validators.minLength(5)
          ])],
          no_ingredientes: [this.no_ingredientes, Validators.compose([
            Validators.required,
            Validators.maxLength(300),
            Validators.minLength(5)
          ])],
          nutritional_values: [this.nutritional_values],
          fat: [this.name, Validators.compose([
            Validators.required,
          ])],
          carbohydrates: [this.carbohydrates, Validators.compose([
            Validators.required,
          ])],
          protein: [this.protein, Validators.compose([
            Validators.required,
          ])],
          total_calories: [this.total_calories, Validators.compose([
            Validators.required,
          ])],
          price_with_iva: [this.price_with_iva, Validators.compose([
            // Validators.required,
          ])],
          iva: [this.iva, Validators.compose([
            // Validators.required,
          ])],
          eat_in_restaurant: [this.eat_in_restaurant],
          wear: [this.wear],
          delivery: [this.delivery],
          status: [this.status],
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
        { type: 'minlength', message: 'Debe ser mayor de 10 caracteres.' },
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
    console.log(this.productos);
    this.storage.get('product').then(res =>{
      console.log(res);
       this.productos = res;
      if(this.productos){
        this.name = res.name;
        this.description = res.description;
        this.ingredientes = res.ingredients.toString();
        this.no_ingredientes = res.no_ingredients.toString();
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
      }
      this.storage.remove('product');

      });
  }

  back(){
    this.storage.remove('product');
    this.router.navigate(['home']);
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1
    // autoplay:true
   };

   async presentPromocion(productID:any) {
    const modal = await this.modalCtrl.create({
      component: ModalPromocionPage,
      componentProps:{
        productID: productID,
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
      //  this.productos = data.products;
      console.log(data);
      if(this.aImages.lenght > 0){
        this.uploadImage(data.products._id);
      }
       this.presentPromocion(data.products._id);
       this.router.navigate(['home']);
   }, err => {
    console.log(err);
  });
   
    // this.router.navigate(['list']);
  });
 }

 uploadImage(id){
  this.productosService.uploadItem(id, this.aImages).then((response) => {
    response.subscribe((data) => {
      console.log(data);
     //  this.productos = data.products;
     console.log(data);
      this.presentPromocion(data.products.id);
      this.router.navigate(['home']);
  }, err => {
      console.log(err);
    });
 });
}

 //////////////////// Imagen //////////////////////


  pickImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.aImages.push(base64Image) ;
    
    }, (err) => {
      // Handle error
    });
  }


}
