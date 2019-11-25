import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanesPage } from './modal-planes.page';

describe('ModalPlanesPage', () => {
  let component: ModalPlanesPage;
  let fixture: ComponentFixture<ModalPlanesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlanesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
