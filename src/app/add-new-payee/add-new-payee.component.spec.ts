import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPayeeComponent } from './add-new-payee.component';

describe('AddNewPayeeComponent', () => {
  let component: AddNewPayeeComponent;
  let fixture: ComponentFixture<AddNewPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPayeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
