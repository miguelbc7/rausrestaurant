import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarconfirmarPage } from './agregarconfirmar.page';

describe('AgregarconfirmarPage', () => {
  let component: AgregarconfirmarPage;
  let fixture: ComponentFixture<AgregarconfirmarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarconfirmarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarconfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
