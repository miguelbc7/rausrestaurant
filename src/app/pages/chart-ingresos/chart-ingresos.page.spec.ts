import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartIngresosPage } from './chart-ingresos.page';

describe('ChartIngresosPage', () => {
  let component: ChartIngresosPage;
  let fixture: ComponentFixture<ChartIngresosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartIngresosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartIngresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
