import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartProductosVendidosPage } from './chart-productos-vendidos.page';

describe('ChartProductosVendidosPage', () => {
  let component: ChartProductosVendidosPage;
  let fixture: ComponentFixture<ChartProductosVendidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartProductosVendidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartProductosVendidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
