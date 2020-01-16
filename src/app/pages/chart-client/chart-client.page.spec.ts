import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartClientPage } from './chart-client.page';

describe('ChartClientPage', () => {
  let component: ChartClientPage;
  let fixture: ComponentFixture<ChartClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
