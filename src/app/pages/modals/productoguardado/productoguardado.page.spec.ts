import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoguardadoPage } from './productoguardado.page';

describe('ProductoguardadoPage', () => {
  let component: ProductoguardadoPage;
  let fixture: ComponentFixture<ProductoguardadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoguardadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoguardadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
