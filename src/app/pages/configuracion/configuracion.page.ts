import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  public items: any = [];
  zipped: boolean = true;
  zipped2: boolean = true;
  zipped3: boolean = true;
  zipped4: boolean = true;
  zipped5: boolean = true;
  zipped6: boolean = true;
  zipped7: boolean = true;

  constructor() { 
    this.items = [
      { expanded: false }
    ];
  }

  //  Soporte
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded2;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
// Sobre Raus
  expandItem2(item): void {
    if (item.expanded2) {
      item.expanded2 = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded2 = !listItem.expanded2;
        } else {
          listItem.expanded2 = false;
        }
        return listItem;
      });
    }
  }
// FAQ
  expandItem3(item): void {
    if (item.expanded3) {
      item.expanded3 = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded3 = !listItem.expanded3;
        } else {
          listItem.expanded3 = false;
        }
        return listItem;
      });
    }
  }
// Cerrar cuenta
  expandItem4(item): void {
    if (item.expanded4) {
      item.expanded4 = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded4 = !listItem.expanded4;
        } else {
          listItem.expanded4 = false;
        }
        return listItem;
      });
    }
  }
  // Condiciones y terminos
  expandItem5(item): void {
    if (item.expanded5) {
      item.expanded5 = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded5 = !listItem.expanded5;
        } else {
          listItem.expanded5 = false;
        }
        return listItem;
      });
    }
  }
  // Politicas de privacidad
  expandItem6(item): void {
    if (item.expanded6) {
      item.expanded6 = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded6 = !listItem.expanded6;
        } else {
          listItem.expanded6 = false;
        }
        return listItem;
      });
    }
  }
  // Acerca de
  expandItem7(item): void {
    if (item.expanded7) {
      item.expanded7 = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded7 = !listItem.expanded7;
        } else {
          listItem.expanded7 = false;
        }
        return listItem;
      });
    }
  }
  toggleZipped(): void {
    this.zipped = !this.zipped;
  }
  toggleZipped2(): void {
    this.zipped2 = !this.zipped2;
  }
  toggleZipped3(): void {
    this.zipped3 = !this.zipped3;
  }
  toggleZipped4(): void {
    this.zipped4 = !this.zipped4;
  }
  toggleZipped5(): void {
    this.zipped5 = !this.zipped5;
  }
  toggleZipped6(): void {
    this.zipped6 = !this.zipped6;
  }
  toggleZipped7(): void {
    this.zipped7 = !this.zipped7;
  }

  ngOnInit() {
  }

}
