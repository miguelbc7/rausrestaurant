import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgramationPage } from './programation.page';

describe('ProgramationPage', () => {
  let component: ProgramationPage;
  let fixture: ComponentFixture<ProgramationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
