import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarPage } from '../modals/agregar/agregar.page';
import { Router } from '@angular/router';

import { AgregarconfirmarPage } from '../modals/agregarconfirmar/agregarconfirmar.page';
import { CierrePage } from '../cierre/cierre.page';
// import { DineromodalPage } from '../modals/dineromodal/dineromodal.page';
import { SaldoService } from 'src/app/services/saldo.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  value:any = 0.00;
  decimal = this.value.toFixed(2).toString().split('.'); 
  data;
  profile:any = {
    business_name: '',
    direction: '',
  };
  avatar = 'assets/img/avatar.png';

  fontSize = 'font60';

  datas = [
    {
      status: false,
      name: 'Cierre día',
      iconoazul: 'assets/img/icon/menu/cierreazul.svg',
      iconogris: 'assets/img/icon/menu/cierregris.svg',
      class: 'iconButton'
    },
    {
      status: false,
      name: 'Agregar',
      iconoazul: 'assets/img/icon/menu/agregarazul.svg',
      iconogris: 'assets/img/icon/menu/agregargris.svg',
      class: 'iconButton'
    },
    {
      status: false,
      name: 'Historial',
      iconoazul: 'assets/img/icon/menu/historialazul.svg',
      iconogris: 'assets/img/icon/menu/historialgris.svg',
      class: 'iconButton'
      },
    {
      status: false,
      name: 'Fidelización',
      iconoazul: 'assets/img/icon/menu/iconofidelizacion.svg',
      iconogris: 'assets/img/icon/menu/iconofidelizacion.svg',
      class: 'iconButton2'
    },
    {
      status: false,
      name: 'Analíticas',
      iconoazul: 'assets/img/icon/menu/analiticasazul.svg',
      iconogris: 'assets/img/icon/menu/analiticasgris.svg',
      class: 'iconButton'
    },
    {
      status: false,
      name: 'Perfil',
      iconoazul: 'assets/img/icon/menu/perfilazul.svg',
      iconogris: 'assets/img/icon/menu/perfilgris.svg',
      class: 'iconButton'
      },
    {
      status: false,
      name: 'Config',
      iconoazul: 'assets/img/icon/menu/configuracionazul.svg',
      iconogris: 'assets/img/icon/menu/configuraciongris.svg',
      class: 'iconButton'
    },
    {
      status: false,
      name: 'Showcase',
      iconoazul: 'assets/img/icon/menu/showcaseazul.svg',
      iconogris: 'assets/img/icon/menu/showcaseazul.svg',
      class: 'iconButton2'
    },
    {
      status: false,
      name: 'Salir',
      iconoazul: 'assets/img/icon/menu/salirazul.svg',
      iconogris: 'assets/img/icon/menu/salirgris.svg',
      class: 'iconButton'
    },
  ];

  constructor(private modalCtrl: ModalController, private router: Router, private saldoService:SaldoService, private authService: AuthService, private storage:Storage, public loading: LoadingService ) { }
   
  ionViewWillEnter(){
    this.loading.showLoader(5000);
    this.getProfile();
    this.getAvatar();
   }

  changeIcon(index: number){
    if(this.datas[index].status == false){
      this.datas[index].status = !this.datas[index].status;
      for(var i=0;i<this.datas.length;i++){
        if(index != i ){
          this.datas[i].status = !this.datas[index].status;
          }
      }
    }
 
    switch(index){
        case (0):
          this.openCierreModal();
        break;

      case (1):
        this.openAgregarSaldo();
        break;

      case (2):
        this.router.navigate(['/historial']);
        break;
        
      case (3):
        this.router.navigate(['/fidelizacion']);
        break;
        
      case (4):
          this.router.navigate(['/analiticas']);
        break;
        
      case (5):
          this.router.navigate(['/perfil']);
        break;
        
      case (6):
          this.router.navigate(['/configuracion']);
        break;

        case (7):
          // this.router.navigate(['/']);
        break;
        
      case (8):
          this.authService.logoutUser();
          this.storage.clear();
          this.router.navigate(['/login']);
        break;
    }

  }

  ngOnInit() {
    this.saldoService.read_Items().then(data => {
      data.subscribe(e => {
       this.data = e;
       let valor = 0;
           for(let i = 0; i<this.data.length; i++){
              valor = Number(valor) + Number(this.data[i].payload.doc.data().value);    
            }
            this.value = valor;
            this.decimal = this.value.toFixed(2).toString().split('.'); 
            console.log(this.decimal[0]);
            if(this.decimal[0].length >= 5){
              this.fontSize = 'font27';
            }else if(this.decimal[0].length >= 3){
              this.fontSize = 'font40';
            }
     })
   });
  }

  async openAgregarSaldo() {
    const modal = await this.modalCtrl.create({
      component: AgregarPage,
      cssClass: 'sizeModalAgregarProducto',
      backdropDismiss:false,
      showBackdrop:true,
    });

    await modal.present();
  }

  async openConfirmarAgregar() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarconfirmarPage,
      cssClass: 'sizeModalConfirmacion',
      backdropDismiss:false,
    });
    await modal.present();
  }

  getAvatar(){
    this.authService.getAvatar().then(response => {
      console.log('response', response);
    if(response)
        this.avatar = response.image;
    });
  }

  async openCierreModal() {
    const modal = await this.modalCtrl.create({
      component: CierrePage,
      cssClass: 'sizeModalCierreModal',
      backdropDismiss:false,
    });
    await modal.present();
  }

  
  getProfile(){
    this.authService.getProfile().then(res =>{
      res.subscribe(data =>{
        this.profile.business_name = data.business_name;
        this.profile.direction = data.direction;
        this.loading.hideLoader();
      })
    });
  }

//   async openDineroModal() {
//     const modal = await this.modalCtrl.create({
//       component: DineromodalPage,
//       cssClass: 'sizeModalDineroModal'
//     });
//     await modal.present();
//  }

}
