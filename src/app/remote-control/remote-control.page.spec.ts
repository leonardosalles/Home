import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteControlPage } from './remote-control.page';

describe('RemoteControlPage', () => {
  let component: RemoteControlPage;
  let fixture: ComponentFixture<RemoteControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteControlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
