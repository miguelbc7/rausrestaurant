import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  public items: any = [];
  zipped: boolean = true;
  zipped2: boolean = true;
  zipped3: boolean = true;
  zipped4: boolean = true;


  constructor() { 
    this.items = [
      // { expanded: false },
      // { expanded: false },
      // { expanded: false },
      { expanded: false }
      // { expanded2: false }
    ];
  }
//  Ingresos
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
// Egresos
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
// Puntos Otorgados
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
// Puntos Canjeados
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

  ngOnInit() {
  }

}
