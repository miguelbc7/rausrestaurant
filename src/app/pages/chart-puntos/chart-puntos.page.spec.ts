import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartPuntosPage } from './chart-puntos.page';

describe('ChartPuntosPage', () => {
  let component: ChartPuntosPage;
  let fixture: ComponentFixture<ChartPuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartPuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
