import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartVentaPage } from './chart-venta.page';

describe('ChartVentaPage', () => {
  let component: ChartVentaPage;
  let fixture: ComponentFixture<ChartVentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
