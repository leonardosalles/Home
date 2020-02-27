import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControlPage } from './led-control.page';

describe('LedControlPage', () => {
  let component: LedControlPage;
  let fixture: ComponentFixture<LedControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedControlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
