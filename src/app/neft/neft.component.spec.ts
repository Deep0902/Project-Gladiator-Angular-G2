import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeftComponent } from './neft.component';

describe('NeftComponent', () => {
  let component: NeftComponent;
  let fixture: ComponentFixture<NeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
