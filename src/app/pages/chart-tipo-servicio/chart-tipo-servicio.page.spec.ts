import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartTipoServicioPage } from './chart-tipo-servicio.page';

describe('ChartTipoServicioPage', () => {
  let component: ChartTipoServicioPage;
  let fixture: ComponentFixture<ChartTipoServicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTipoServicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartTipoServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
