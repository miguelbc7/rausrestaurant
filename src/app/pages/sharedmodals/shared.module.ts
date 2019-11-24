import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { CommonModule} from '@angular/common';

// import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
// import { AddsliderPage } from '../modals/addslider/addslider.page';
// import { ExcelentePage } from '../modals/excelente/excelente.page';

import { ComponetsPoliticasComponent } from '../../components/componets-politicas/componets-politicas.component';
import { ComponentTerminosComponent } from '../../components/component-terminos/component-terminos.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { ExpandableComponent } from "../../components/expandable/expandable.component";

@NgModule ({
    declarations: [
        ComponetsPoliticasComponent,
        ComponentTerminosComponent,
        NavbarComponent,
        ExpandableComponent
        // ModalPromocionPage,
        // AddsliderPage,
        // ExcelentePage
    ],
    exports: [
        ComponetsPoliticasComponent,
        ComponentTerminosComponent,
        NavbarComponent,
        ExpandableComponent
        // ModalPromocionPage,
        // AddsliderPage,
        // ExcelentePage
    ],
    imports: [
        IonicModule,
    ]
})

export class SharedModule {}