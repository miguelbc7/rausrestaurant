import { Component, OnInit } from '@angular/core';
import { HorariosPage } from '../modals/horarios/horarios.page';

import { AddsliderPage } from '../modals/addslider/addslider.page';
import { EditavatarPage } from '../modals/editavatar/editavatar.page';
import { ModalAddproductPage } from '../modals/modal-addproduct/modal-addproduct.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { EditdireccionPage } from '../modals/editdireccion/editdireccion.page';
// import { AgregarPage } from '../modals/agregar/agregar.page';
// import { CierrePage } from '../cierre/cierre.page';
// import { AgregartarjetaPage } from '../modals/agregartarjeta/agregartarjeta.page';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductosService } from '../../services/productos.service';
import { HorarioService } from 'src/app/services/horario.service';
import { SliderHomeService } from 'src/app/services/slider-home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  productos:any;
  token:any;
  horarios: any= [
    {
      name: 'Lunes',
      status: true,
      schedules:[{
        id: 1,
        start: '11:00',
        end: '16:00'
      },{
        id: 2,
        start: '20:00',
        end: '22:00'
      }]
    },
    {
      name: 'Martes',
      status: false,
      schedules:[{
        id: 1,
        start: '11:00',
        end: '16:00'
      }]
    }
  ] ;
  lunes:any = [];
  martes:any = [];
  miercoles:any = [];
  jueves:any = [];
  viernes:any = [];
  sabado:any = [];
  domingo:any = [];
  slider: any;
  avatar;
  aImages:any = [];

  constructor(private modalCtrl: ModalController, 
    public productosService: ProductosService, 
    private storage: Storage, 
    private sliderService: SliderHomeService, 
    private horarioService:HorarioService,
    private authService: AuthService,
    private camera: Camera,
    public router:Router) {
    this.productos = [];
    this.storage.get('_token').then(val =>{
      this.token = val.token;
    })
   }

  ngOnInit() {
    this.getListProductos();
    this.getListHorario();
    this.getSlider();
  }
  async addslider() {
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.aImages.push(base64Image) ;
        this.sliderService.create_NewItem({image:base64Image}).then((response) => {
          response.subscribe((data) => {
        }, err => {
            console.log(err);
          });
       });
    
    }, (err) => {
      // Handle error
    });
}

  async openHorarios(dia, data) {
    const modal = await this.modalCtrl.create({
      component: HorariosPage,
      componentProps: { 
        name: dia,
        schedules: data,
      }
    });
    await modal.present();
  }

  // async openAgregarSaldo() {
  //   const modal = await this.modalCtrl.create({
  //     component: AgregarPage,
  //     cssClass: 'sizeModalAgregarProducto'
  //   });
  //   await modal.present();
  // }

  async addpromocion(productID) {
    // this.storage.set('productID', productID);
    const modal = await this.modalCtrl.create({
      component: ModalPromocionPage,
      componentProps:{
        productID:productID,
      },
      cssClass: 'sizeModalPromocion'
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

//  async openCierreModal() {
//   const modal = await this.modalCtrl.create({
//     component: CierrePage,
//     cssClass: 'sizeModalCierreModal'
//   });
//   await modal.present();
// }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1
    // autoplay:true
   };
   
   getListProductos()
   {
    this.productosService.getList().then(response => {
      response.subscribe((data) => {
        this.productos = data.products;
     }, err => {
      console.log(err);
    });
    });
   }

   getListHorario(){
    this.horarioService.getList().then(response => {
      response.subscribe((data) => {
        this.horarios = data.schedules;

        for(let dia of  this.horarios){
          switch(dia.name){
            case('Lunes'):
              this.lunes.push(dia);
              break;
            case('Martes'):
              this.martes.push(dia);
              break;
            case('Miercoles'):
              this.miercoles.push(dia);
              break;
            case('Jueves'):
              this.jueves.push(dia);
              break;
            case('Viernes'):
              this.viernes.push(dia);
              break;
            case('Sabado'):
            this.sabado.push(dia);
              break;
            case('Domingo'):
              this.domingo.push(dia);
              break;
          }
        }
     }, err => {
      console.log(err);
    });
    });
   }
   
   editProduct(product) {
     this.storage.set('product', product);
     this.router.navigate(['/agregarproducto']);
  }

  addProduct()
  {
    this.storage.remove('product');
    this.router.navigate(['/agregarproducto']);
  }

  getSlider(){
    this.sliderService.read_Items().then(response => {
      response.subscribe((data) => {
        this.slider = data;
     }, err => {
      console.log(err);
    });
    });
  }

  async editslider(){
    const modal = await this.modalCtrl.create({
      component: AddsliderPage,
    });
    await modal.present();
  }
}


