import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelizacionPage } from './fidelizacion.page';

describe('FidelizacionPage', () => {
  let component: FidelizacionPage;
  let fixture: ComponentFixture<FidelizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelizacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FidelizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
