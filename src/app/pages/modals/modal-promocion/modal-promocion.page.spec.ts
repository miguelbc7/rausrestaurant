import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromocionPage } from './modal-promocion.page';

describe('ModalPromocionPage', () => {
  let component: ModalPromocionPage;
  let fixture: ComponentFixture<ModalPromocionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPromocionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPromocionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
