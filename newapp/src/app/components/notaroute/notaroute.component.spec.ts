import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarouteComponent } from './notaroute.component';

describe('NotarouteComponent', () => {
  let component: NotarouteComponent;
  let fixture: ComponentFixture<NotarouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotarouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotarouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
