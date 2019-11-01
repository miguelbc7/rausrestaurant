import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponetsPoliticasComponent } from '../../components/componets-politicas/componets-politicas.component';
import { ComponentTerminosComponent } from '../../components/component-terminos/component-terminos.component';

@NgModule ({
    declarations: [
        ComponetsPoliticasComponent,
        ComponentTerminosComponent
    ],
    exports: [
        ComponetsPoliticasComponent,
        ComponentTerminosComponent
    ],
    imports: [
        IonicModule
    ]
})

export class SharedModule {}