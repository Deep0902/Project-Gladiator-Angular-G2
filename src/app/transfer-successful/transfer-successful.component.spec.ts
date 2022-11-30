import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSuccessfulComponent } from './transfer-successful.component';

describe('TransferSuccessfulComponent', () => {
  let component: TransferSuccessfulComponent;
  let fixture: ComponentFixture<TransferSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferSuccessfulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
