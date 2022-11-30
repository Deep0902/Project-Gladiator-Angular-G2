import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotLogidComponent } from './fogot-logid.component';

describe('FogotLogidComponent', () => {
  let component: FogotLogidComponent;
  let fixture: ComponentFixture<FogotLogidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogotLogidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogotLogidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
