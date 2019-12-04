import { Component, OnInit } from '@angular/core';
import { HorariosPage } from '../modals/horarios/horarios.page';

import { AddsliderPage } from '../modals/addslider/addslider.page';
import { EditavatarPage } from '../modals/editavatar/editavatar.page';
import { ModalAddproductPage } from '../modals/modal-addproduct/modal-addproduct.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { EditdireccionPage } from '../modals/editdireccion/editdireccion.page';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductosService } from '../../services/productos.service';
import { HorarioService } from 'src/app/services/horario.service';
import { SliderHomeService } from 'src/app/services/slider-home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  productos:any;
  token:any;
  horarios: any = [];
  lunes:any = [];
  martes:any = [];
  miercoles:any = [];
  jueves:any = [];
  viernes:any = [];
  sabado:any = [];
  domingo:any = [];
  slider: any;
  aImages:any = [];
  ingredientes;
  profile:any = {
    business_name: '',
    direction: '',
  };
  avatar = 'assets/img/avatar.png';

  constructor(
    private modalCtrl: ModalController, 
    public productosService: ProductosService, 
    private storage: Storage, 
    private sliderService: SliderHomeService, 
    private horarioService:HorarioService,
    private authService: AuthService,
    private camera: Camera,
    public loading: LoadingService,
    private actionSheetController: ActionSheetController,
    public router:Router) {
    this.productos = [];
    this.storage.get('_token').then(val =>{
      this.token = val.token;
    })
   }

   ionViewWillEnter(){
    // this.ngOnInit();
    this.getProfile();
    this.getSlider();
    this.getListHorario();
    this.getListProductos();
    this.getAvatar();
   }
  ngOnInit() {
    
  }

  goToOpcion()
  {
    this.router.navigate(['/opciones']);
  }

  getProfile(){
    this.authService.getProfile().then(res =>{
      res.subscribe(data =>{
        this.profile.business_name = data.business_name;
        this.profile.direction = data.direction;
        this.storage.set('profile',data);
      })
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Cargar imagen',
                handler: () => {
                    this.addslider(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Tomar foto',
                handler: () => {
                    this.addslider(this.camera.PictureSourceType.CAMERA);
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

   addslider(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
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
            console.log(data);
            this.getSlider();
        }, err => {
            console.error(err);
          });
       });
    
    }, (err) => {
      // Handle error
    });
}

  async openHorarios(dia, data) {
    const modal = await this.modalCtrl.create({
      component: HorariosPage,
      cssClass: 'sizeModalHorario',
      componentProps: { 
        name: dia,
        schedules: data,
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.getListHorario();
        //alert('Modal Sent Data :'+ dataReturned);
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
      cssClass: 'sizeModalPromocion',
      backdropDismiss:false,
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
    this.loading.present(6000);
     this.productosService.getList().then(response => {
       console.log('response list prod')
       response.subscribe((data) => {
         console.log('data', data);
         this.productos = data.products;
         for (let index = 0; index < this.productos.length; index++) {
           const element = this.productos[index];
           console.log(element);
          //  this.productosService.getImagen(element._id).then(res=>{
          //    console.log(res);
          //    if(res){
          //      res.subscribe(data=>{
          //        this.productos[index].images = data;
  
          //      })
          //    }
          //  })
         }
         this.loading.hideLoader();
        }, err => {
          console.log(err);
        });
      });
   }

   getListHorario(){
    this.lunes = [];
    this.martes = [];
    this.miercoles = [];
    this.jueves = [];
    this.viernes = [];
    this.sabado = [];
    this.domingo = [];
     this.horarioService.getList().then(response => {
      response.subscribe((data) => {
        if(data.schedules.schedules){
          for(let index = 0 ; index < data.schedules.schedules.length; index++){
            
              switch(data.schedules.schedules[index].name){
                case('Lunes'):
                this.lunes.push(data.schedules.schedules[index]);
                  break;
                case('Martes'):
                  this.martes.push(data.schedules.schedules[index]);
                  break;
                case('Miercoles'):
                  this.miercoles.push(data.schedules.schedules[index]);
                  break;
                case('Jueves'):
                  this.jueves.push(data.schedules.schedules[index]);
                  break;
                case('Viernes'):
                  this.viernes.push(data.schedules.schedules[index]);
                  break;
                case('Sabado'):
                this.sabado.push(data.schedules.schedules[index]);
                  break;
                case('Domingo'):
                  this.domingo.push(data.schedules.schedules[index]);
                  break;
              }
            }
          }
     }, err => {
      console.log(err);
    });
    });

   }
   
   editProduct(product) {
     console.log('edit',product);
     delete product.images;
     this.storage.set('typeProduct', 'edit');
     this.storage.set('product', product).then(()=>{

       this.router.navigate(['/agregarproducto']);
     }).catch(error => console.error(error));
  }

  addProduct()
  {
    this.storage.remove('product');
    this.storage.set('typeProduct', 'create');
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

  getAvatar(){
    this.authService.getAvatar().then(response => {
      console.log('response', response);
      if(response)
        this.avatar = response.image;
    });
  }

  async deleteSlider(id){
    // this.storage.set('imgPreview', img);
    // const modal = await this.modalCtrl.create({
    //   component: AddsliderPage,
    //   componentProps:[
    //   ]
    // });
    // await modal.present();
    console.log(id);
    this.sliderService.delete_Item(id);
  }

  ngOnDestroy(){
    
  }
}


