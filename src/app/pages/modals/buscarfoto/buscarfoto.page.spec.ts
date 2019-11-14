import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarfotoPage } from './buscarfoto.page';

describe('BuscarfotoPage', () => {
  let component: BuscarfotoPage;
  let fixture: ComponentFixture<BuscarfotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarfotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarfotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
