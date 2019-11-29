import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';


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
  ingredientes:any =[]  ;
  // dingredientes:any = [];;
  no_ingredientes:any =[] ; 
  // dno_ingredientes:any = [];
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
  type;
  

  constructor(
    private modalCtrl: ModalController, 
    public formBuilder: FormBuilder, 
    private router: Router,
    private productosService: ProductosService, 
    private camera: Camera,
    private storage:Storage,
    public loading: LoadingService,
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
    }
    ionViewWillEnter(){
      console.log(this.type);
    }
  ngOnInit() {
    console.log(this.productos);
    this.storage.get('typeProduct').then(res =>{
      this.type = res;
      console.log(this.type);
      if(res == 'create'){
        this.storage.remove('product');
      }
    })

    this.storage.get('product').then(res =>{
      console.log(res);
       this.productos = res;

       if(this.productos){
         res.ingredients.forEach(key => {
           console.log(key);
           this.ingredientes.push(key.name);
         });
         res.no_ingredients.forEach(key => {
          console.log(key);
          this.no_ingredientes.push(key.name);
        });
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
        this.aImages = res.images;
      }

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

  async addslider(img) {
    console.log(img);
    this.storage.set('imgPreview', img);
    console.log('addslier');
    const modal = await this.modalCtrl.create({
      component: AddsliderPage,
      componentProps:[
       {
          img:img
        }
      ]
    });
    await modal.present();
 }

 onSubmit(values)
 {
  this.loading.showLoader();
   let aIngredients = values.ingredientes.split(',');
   let aNoIngredients = values.no_ingredientes.split(',');
   console.log(aIngredients);
   for (let index = 0; index < aIngredients.length; index++) {
    values.ingredients = [aIngredients[index]= { 'name' :aIngredients[index] } ] ;
     
   }

   for (let index = 0; index < aNoIngredients.length; index++) {
    console.log(aNoIngredients[index]);
    values.no_ingredients = [aNoIngredients[index]= { 'name' :aNoIngredients[index] } ] ;
    
  }
  
   console.log(values);
   console.log(this.type);
   if(this.type == 'create'){
     console.log(this.type);
     this.productosService.createItem(values).then((response) => {
       response.subscribe(async (data) => {
        //  this.productos = data.products;
        console.log(data);
        if(this.aImages.length > 0){
        await  this.uploadImage(data._id);
        }else{
          // await this.presentPromocion(data._id);
          await this.router.navigate(['home']);
        }
     }, err => {
      console.log(err);
    });
     
      // this.router.navigate(['list']);
    });
   }else if(this.type == 'edit'){
    console.log(this.type);
      this.productosService.updateItem(this.productos._id,values).then((response) => {
        response.subscribe(async (data) => {
        //  this.productos = data.products;
        console.log(data);
        console.log(this.productos._id);
        if(this.aImages.length > 0){
          console.log('imagenes1')
          await this.uploadImage(this.productos._id);
        }else{
          //  await this.presentPromocion(this.productos._id);
          this.loading.hideLoader();
           await this.router.navigate(['home']);
        }
      }, err => {
      console.log(err);
    });
      
      // this.router.navigate(['list']);
    });
   }
 }

  uploadImage(id){
   console.log('uploadimage');
  console.log(this.aImages);
   this.productosService.uploadItem(id, this.aImages).then((response) => {
    response.subscribe(async (data) => {
      //  this.productos = data.products;
      console.log('uploadimage data');
      console.log(data);
      // await this.presentPromocion(id);
      this.loading.hideLoader();
      await this.router.navigate(['home']);
      
  }, err => {
      console.error(err);
    });
 });
}

 //////////////////// Imagen //////////////////////


  pickImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData.subString(23);
      this.aImages.push({img : base64Image}) ;
      console.log(this.aImages);
      
    }, (err) => {
      // Handle error
    });
  }


}
