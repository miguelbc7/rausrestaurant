import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartarjetaPage } from './agregartarjeta.page';

describe('AgregartarjetaPage', () => {
  let component: AgregartarjetaPage;
  let fixture: ComponentFixture<AgregartarjetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregartarjetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregartarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
