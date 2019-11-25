import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsliderPage } from './addslider.page';

describe('AddsliderPage', () => {
  let component: AddsliderPage;
  let fixture: ComponentFixture<AddsliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsliderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
