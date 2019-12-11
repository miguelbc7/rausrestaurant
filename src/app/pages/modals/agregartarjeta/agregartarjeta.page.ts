import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarlistoPage } from '../agregarlisto/agregarlisto.page';
import { AgregarPage } from '../agregar/agregar.page';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregartarjeta',
  templateUrl: './agregartarjeta.page.html',
  styleUrls: ['./agregartarjeta.page.scss'],
})
export class AgregartarjetaPage implements OnInit {

  numero;
  nombre;
  cvc;
  fechaExp;
  year;
  month;

  public cardForm: FormGroup;
  validation_messages = {
    'nombre': [
        { type: 'required', message: 'Debe ingresar un nombre.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      'cvc': [
        { type: 'required', message: 'Debe ingresar el cvc de la tarjeta.' },
        { type: 'minlength', message: 'Debe ser máximo 3 digitos.' },
        { type: 'maxlength', message: 'Debe ser máximo 3 digitos.' },
      ],
      'fechExp': [
        { type: 'required', message: 'Debe ingresar la fecha de expiración.' },
      ],
      'numero': [
        { type: 'required', message: 'Debe ingresar el número de la tarjeta.' },
        { type: 'minlength', message: 'Debe ser mayor a 16 digitos.' },
        { type: 'maxlength', message: 'Debe ser menor a 20 digitos.' },
        // { type: 'pattern', message: 'Debe ingresar solo digitos.' },
      ],
    }
  errorMessage: any;

  constructor(private modalCtrl: ModalController, private creditCardService:CreditCardService, public formBuilder: FormBuilder) { 
    this.cardForm = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(300),
        Validators.minLength(5)
      ])],
      cvc: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])],
      year: ['', Validators.compose([
        Validators.required,
      ])],
      month: ['', Validators.compose([
        Validators.required,
      ])],
      numero: ['', Validators.compose([
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(19),
        // Validators.pattern('/^(?=.*\d)[\d]*$/'),
      ])],
  });
  }

  ngOnInit() {
  }

  async openAgregarSaldo() {

    let record = {};
    record['nombre'] = this.nombre;
    record['numero'] = this.numero;
    record['cvc'] = this.cvc;
    record['fechaExp'] = {month: this.month ,year: this.year};

    console.log(record);
    this.creditCardService.create_NewItem(record).then(async resp => {
      this.nombre = '';
      this.numero = '';
      this.cvc = '';
      this.fechaExp = '';
      this.month = '';
      this.year = '';
     
      await this.modalCtrl.dismiss();
      const modal = await this.modalCtrl.create({
        component: AgregarPage,
        cssClass: 'sizeModalAgregarProducto'
      });
      await modal.present();
    },(err) => {
      console.error(err);
      if(err.error){
        this.errorMessage = err.error.error;
      }
    })
      .catch(error => {
        console.log(error);
      });
      
  }

  async openAgregarListo() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarlistoPage,
      cssClass: 'sizeModalAgregarListo'
    });
    await modal.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
