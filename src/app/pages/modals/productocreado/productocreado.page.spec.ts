import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductocreadoPage } from './productocreado.page';

describe('ProductocreadoPage', () => {
  let component: ProductocreadoPage;
  let fixture: ComponentFixture<ProductocreadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductocreadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductocreadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
