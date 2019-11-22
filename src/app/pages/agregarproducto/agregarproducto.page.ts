import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  public productoForm: FormGroup;

  productos:any = [];

  constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder, private router: Router,private productosService: ProductosService) {
    this.productoForm = formBuilder.group({
        name: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        description: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        ingredients: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(5)
        ])],
        no_ingredients: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(5)
        ])],
        nutricional_values: [true],
        fat: ['', Validators.compose([
          Validators.required,
        ])],
        carbohyrates: ['', Validators.compose([
          Validators.required,
        ])],
        protein: ['', Validators.compose([
          Validators.required,
        ])],
        total_calories: ['', Validators.compose([
          Validators.required,
        ])],
        price_with_iva: ['', Validators.compose([
          // Validators.required,
        ])],
        iva: ['', Validators.compose([
          // Validators.required,
        ])],
        eat_in_restaurant: [true],
        wear: [true],
        delivery: [true],
        status: [true],
        // images: ['', Validators.compose([
        //   Validators.required,
        // ])],
        stock: ['', Validators.compose([
          Validators.required,
        ])],
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
      'ingredients': [
        { type: 'required', message: 'Debe ingresar los ingredientes.' },
        { type: 'maxlength', message: 'Debe ser menor de 20 caracteres.' }
      ],
      'no_ingredients': [
        { type: 'required', message: 'Debe ingresar los alergenos.' },
      ],
      'nutricional_values': [
      ],
      'fat': [
        { type: 'required', message: 'Debe ingresar la cantidad de grasas.' },
      ],
      'carbohyrates': [
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
   console.log(values);
   this.presentPromocion();
  this.productosService.createItem(values).subscribe((response) => {
    console.log('response ' + response);
    this.presentPromocion();
    // this.router.navigate(['list']);
  });
 }
}
