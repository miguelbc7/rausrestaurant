import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdireccionPage } from './editdireccion.page';

describe('EditdireccionPage', () => {
  let component: EditdireccionPage;
  let fixture: ComponentFixture<EditdireccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdireccionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
