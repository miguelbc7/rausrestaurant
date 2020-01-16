import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticasPage } from './analiticas.page';

describe('AnaliticasPage', () => {
  let component: AnaliticasPage;
  let fixture: ComponentFixture<AnaliticasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliticasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
