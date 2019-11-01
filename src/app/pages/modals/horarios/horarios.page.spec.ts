import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosPage } from './horarios.page';

describe('HorariosPage', () => {
  let component: HorariosPage;
  let fixture: ComponentFixture<HorariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
