import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelentePage } from './excelente.page';

describe('ExcelentePage', () => {
  let component: ExcelentePage;
  let fixture: ComponentFixture<ExcelentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
