import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartOperacionesPage } from './chart-operaciones.page';

describe('ChartOperacionesPage', () => {
  let component: ChartOperacionesPage;
  let fixture: ComponentFixture<ChartOperacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartOperacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartOperacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
