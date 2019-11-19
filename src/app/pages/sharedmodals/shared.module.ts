import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule} from '@angular/common';
import { ComponetsPoliticasComponent } from '../../components/componets-politicas/componets-politicas.component';
import { ComponentTerminosComponent } from '../../components/component-terminos/component-terminos.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@NgModule ({
    declarations: [
        ComponetsPoliticasComponent,
        ComponentTerminosComponent,
        NavbarComponent
    ],
    exports: [
        ComponetsPoliticasComponent,
        ComponentTerminosComponent,
        NavbarComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ]
})

export class SharedModule {}