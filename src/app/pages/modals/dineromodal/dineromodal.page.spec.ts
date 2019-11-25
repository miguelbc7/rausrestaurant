import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DineromodalPage } from './dineromodal.page';

describe('DineromodalPage', () => {
  let component: DineromodalPage;
  let fixture: ComponentFixture<DineromodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DineromodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DineromodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
