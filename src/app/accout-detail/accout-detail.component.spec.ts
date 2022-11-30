import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutDetailComponent } from './accout-detail.component';

describe('AccoutDetailComponent', () => {
  let component: AccoutDetailComponent;
  let fixture: ComponentFixture<AccoutDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccoutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
